import * as anchor from "@coral-xyz/anchor";
import { BN } from "@coral-xyz/anchor"
import { Program } from "@coral-xyz/anchor";
import { BookchainContracts } from "../target/types/bookchain_contracts";
import {
  PublicKey,
  Connection, 
  LAMPORTS_PER_SOL, 
  SystemProgram, 
  Transaction, 
  sendAndConfirmTransaction
} from "@solana/web3.js";
import { 
  NATIVE_MINT, 
  createAssociatedTokenAccountInstruction, 
  createSyncNativeInstruction, 
  getAccount, 
  ASSOCIATED_TOKEN_PROGRAM_ID as associatedTokenProgram, 
  TOKEN_PROGRAM_ID as tokenProgram, 
  createMint, 
  createAccount, 
  mintTo, 
  getAssociatedTokenAddress, 
  TOKEN_PROGRAM_ID, 
  getOrCreateAssociatedTokenAccount 
} from "@solana/spl-token"


// Sleep function
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe("bookchain-contracts", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.getProvider(); 
  anchor.AnchorProvider.env().opts.commitment = "finalized";

  const program = anchor.workspace.BookchainContracts as Program<BookchainContracts>;

  // Authority signer.
  const wallet = anchor.web3.Keypair.generate();
  console.log(`Created Wallet ${wallet.publicKey.toBase58()}`);

  // Random user.
  const user1 = anchor.web3.Keypair.generate();
  console.log(`Created User ${user1.publicKey.toBase58()}`);

  let id = new BN(Math.floor(Math.random() * 1000000000));

  // Program derived addresses
  let [project, projectBump] = PublicKey.findProgramAddressSync([Buffer.from("project"), id.toBuffer('le', 8)], program.programId);
  let [vault, vaultBump] = PublicKey.findProgramAddressSync([Buffer.from("vault"), project.toBuffer()], program.programId);

  //ATA
  let WalletAta = null;

  //Project Data
  let projectName = "Test Project";

  it("Starts an airdrop and confirms it", async () => {
    const signature = await provider.connection.requestAirdrop(wallet.publicKey, 100 * LAMPORTS_PER_SOL);
      const latestBlockhash = await provider.connection.getLatestBlockhash();
      await provider.connection.confirmTransaction(
      {
          signature,
          ...latestBlockhash,
      },
    "confirmed"
    );
  })

  it("Initialize Project", async () => {

    try {

    const tx = await program.methods
    .projectInit(
      id,
      projectName,
      projectBump
    )
    .accounts({
      project: project,
      initializer: wallet.publicKey,
      token: NATIVE_MINT,
      systemProgram: SystemProgram.programId
    })
    .signers([
      wallet
    ]).rpc().then(confirmTx);

    let projectAccount = await program.account.project.fetch(project);
    console.log(`Project Address: ${project}`);
    console.log(`Id: ${projectAccount.id}`);
    console.log(`Auth: ${projectAccount.authority}`);
    console.log(`Project Name: ${projectAccount.name}`);
    console.log(`Balance: ${projectAccount.balance}`);
    console.log(`Token: ${projectAccount.token}`);

    } catch (err) {
      console.log(err);
    }

  });

  it("Deposit into the ProjectVault", async () => {

    try {

      WalletAta = await getAssociatedTokenAddress(
        NATIVE_MINT,
        wallet.publicKey
      )
      
      // Create token account to hold your wrapped SOL
      const ataTransaction = new Transaction()
        .add(
          createAssociatedTokenAccountInstruction(
            wallet.publicKey,
            WalletAta,
            wallet.publicKey,
            NATIVE_MINT
          )
        );
      
      await sendAndConfirmTransaction(provider.connection, ataTransaction, [wallet]);
      
      // Transfer SOL to associated token account and use SyncNative to update wrapped SOL balance
      const solTransferTransaction = new Transaction()
        .add(
          SystemProgram.transfer({
              fromPubkey: wallet.publicKey,
              toPubkey: WalletAta,
              lamports: 2*LAMPORTS_PER_SOL
            }),
            createSyncNativeInstruction(
              WalletAta
          )
        )
      
      await sendAndConfirmTransaction(provider.connection, solTransferTransaction, [wallet]);

      const tx = await program.methods
      .projectDeposit(
        new BN(2*LAMPORTS_PER_SOL),
      )
      .accounts({
        projectVault: vault,
        project: project,
        user: wallet.publicKey,
        userAta: WalletAta,
        token: NATIVE_MINT,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: associatedTokenProgram,
        systemProgram: SystemProgram.programId
      })
      .signers([
        wallet
      ]).rpc({skipPreflight: true});

      console.log(`Vault Address: ${vault}`);

      provider.connection.getBalance(vault).then((balance) => {
        console.log("Balance: ", balance);
      });

      let projectAccount = await program.account.project.fetch(project);
      console.log(`Project Balance: ${projectAccount.balance}`);

      } catch (err) {
        console.log(err);
      }
  });

  it("Withdraw into the ProjectVault", async () => {

    try {
      
      const tx = await program.methods
      .projectWithdraw(
        new BN(2*LAMPORTS_PER_SOL),
      )
      .accounts({
        projectVault: vault,
        project: project,
        user: wallet.publicKey,
        userAta: WalletAta,
        token: NATIVE_MINT,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: associatedTokenProgram,
        systemProgram: SystemProgram.programId
      })
      .signers([
        wallet
      ]).rpc();

      provider.connection.getBalance(vault).then((balance) => {
        console.log("Balance: ", balance);
      });

      let projectAccount = await program.account.project.fetch(project);
      console.log(`Project Balance: ${projectAccount.balance}`);

      } catch (err) {
        console.log(err);
      }
  });

  it ("Close Project", async () => {
      
    try {

      const tx = await program.methods
      .projectClose(
        id
      )
      .accounts({
        projectVault: vault,
        project: project,
        authority: wallet.publicKey,
        authorityAta: WalletAta,
        token: NATIVE_MINT,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: associatedTokenProgram,
        systemProgram: SystemProgram.programId
      })
      .signers([
        wallet
      ]).rpc().then(confirmTx);

      let transaction = await anchor.getProvider().connection.getTransaction(tx, { commitment: "confirmed" });
      console.log(transaction)

      let account = await program.account.closedProject.fetch(project, "confirmed");
      console.log(account)

    } catch (err) {
      console.log(err);
    }

  });

});


const confirmTx = async (signature: string): Promise<string> => {
  const latestBlockhash = await anchor.getProvider().connection.getLatestBlockhash();
  await anchor.getProvider().connection.confirmTransaction(
    {
      signature,
      ...latestBlockhash,
    },
    "confirmed"
  )
  return signature
}
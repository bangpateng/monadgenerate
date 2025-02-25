import chalk from 'chalk';
import fs from 'fs';
import readlineSync from 'readline-sync';
import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

console.log(chalk.yellow.bold('🔥 Pilih Opsi: \n'));

console.log(chalk.white('1. Generate Wallet'));
console.log(chalk.white('2. Send MON Token'));

const choice = readlineSync.question(chalk.magentaBright('\n Masukkan pilihan (1/2): '));

function generateWallet() {
    const wallet = ethers.Wallet.createRandom();
    return {
        address: wallet.address,
        privateKey: wallet.privateKey
    };
}

if (choice === '1') {

    const walletCount = readlineSync.question(chalk.greenBright('\n 💡 Masukkan jumlah wallet yang ingin di-generate: '));

    if (isNaN(walletCount) || walletCount <= 0) {
        console.log(chalk.redBright('\n ✌ Masukkan angka yang valid.'));
        process.exit(1);
    }

    const addresses = [];
    const privateKeys = [];

    for (let i = 0; i < walletCount; i++) {
        const wallet = generateWallet();
        addresses.push(wallet.address);
        privateKeys.push(wallet.privateKey);
    }

    fs.writeFileSync('addresses.txt', addresses.join('\n'));
    console.log(chalk.green(`✔ Addresses saved to addresses.txt (${walletCount} wallets)`));

    fs.writeFileSync('private_keys.txt', privateKeys.join('\n'));
    console.log(chalk.green(`✔ Private keys saved to private_keys.txt (${walletCount} wallets)`));
} 

else if (choice === '2') {

    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    const RPC_URL = process.env.RPC_URL;

    if (!PRIVATE_KEY || !RPC_URL) {
        console.error(chalk.redBright("? ERROR: Harap isi file .env dengan PRIVATE_KEY dan RPC_URL."));
        process.exit(1);
    }

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    (async () => {
        try {
            console.log(chalk.blueBright(`💡 Alamat Pengirim: ${wallet.address}`));
            const nativeBalance = await provider.getBalance(wallet.address);
            console.log(chalk.greenBright(`🔥 Saldo Native: ${ethers.formatUnits(nativeBalance, "ether")} MON`));
        } catch (error) {
            console.error(chalk.redBright("✌ Gagal mendapatkan saldo native:", error.message));
        }
    })();

    const addresses = fs.readFileSync('addresses.txt', 'utf8')
        .split('\n')
        .map(addr => addr.trim())
        .filter(addr => ethers.isAddress(addr));

    if (addresses.length === 0) {
        console.error(chalk.redBright("✌ Tidak ada alamat yang valid di addresses.txt."));
        process.exit(1);
    }

    const TOKEN_AMOUNT = readlineSync.question(chalk.greenBright("\n 💡 Masukkan jumlah MON yang ingin dikirim per alamat: "));
    if (isNaN(TOKEN_AMOUNT) || parseFloat(TOKEN_AMOUNT) <= 0) {
        console.error(chalk.redBright("✌ Jumlah token tidak valid."));
        process.exit(1);
    }

    (async () => {
        try {
            const amountToSend = ethers.parseUnits(TOKEN_AMOUNT, "ether");
            const nativeBalance = await provider.getBalance(wallet.address);
            const totalAmountToSend = amountToSend * BigInt(addresses.length);

            if (BigInt(nativeBalance) < totalAmountToSend) {
                console.error(chalk.redBright(`✌ Saldo tidak cukup. Dibutuhkan ${ethers.formatUnits(totalAmountToSend, "ether")} MON.`));
                process.exit(1);
            }

            console.log(chalk.yellowBright(`\n 💡 Mengirim ${TOKEN_AMOUNT} MON ke ${addresses.length} alamat...\n`));

            for (const to of addresses) {
                console.log(chalk.blueBright(`🔥 Mengirim ${TOKEN_AMOUNT} MON ke ${to}...`));

                try {
                    const tx = await wallet.sendTransaction({
                        to: to,
                        value: amountToSend,
                        gasLimit: 21000
                    });

                    console.log(chalk.greenBright(`✔ Tx Hash: ${tx.hash}`));
                    await tx.wait();
                    console.log(chalk.greenBright(`✔ Berhasil dikirim ke ${to}\n`));

                    await new Promise(resolve => setTimeout(resolve, 5000));

                } catch (error) {
                    console.error(chalk.redBright(`✌ Gagal mengirim ke ${to}: ${error.reason || error.message}`));
                    await new Promise(resolve => setTimeout(resolve, 10000));
                }
            }

            console.log(chalk.greenBright("🚀 Semua transaksi selesai."));
        } catch (error) {
            console.error(chalk.redBright("✌ Terjadi kesalahan:", error.message));
        }
    })();
} 

else {
    console.log(chalk.redBright('\n ✌ Pilihan tidak valid!'));
}

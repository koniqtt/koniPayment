const { Client, GatewayIntentBits, ActivityType, AttachmentBuilder, MessageEmbed } = require('discord.js');
require('dotenv').config();
const express = require('express');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const statusMessages = ['alagad ni koni', 'mua ka sakin boss'];
const statusTypes = ['dnd', 'idle'];
let currentStatusIndex = 0;
let currentTypeIndex = 0;

async function login() {
    try {
        await client.login(process.env.TOKEN);
        console.log(
            '\x1b[36m[ LOGIN ]\x1b[0m',
            `\x1b[32mLogged in as: ${client.user.tag} ✅\x1b[0m`
        );
        console.log(
            '\x1b[36m[ INFO ]\x1b[0m',
            `\x1b[35mBot ID: ${client.user.id} \x1b[0m`
        );
        console.log(
            '\x1b[36m[ INFO ]\x1b[0m',
            `\x1b[34mConnected to ${client.guilds.cache.size} server(s) \x1b[0m`
        );
    } catch (error) {
        console.error('\x1b[31m[ ERROR ]\x1b[0m', 'Failed to log in:', error);
        process.exit(1);
    }
}

function updateStatus() {
    const currentStatus = statusMessages[currentStatusIndex];
    const currentType = statusTypes[currentTypeIndex];
    client.user.setPresence({
        activities: [{ name: currentStatus, type: ActivityType.Custom }],
        status: currentType,
    });
    console.log(
        '\x1b[33m[ STATUS ]\x1b[0m',
        `Updated status to: ${currentStatus} (${currentType})`
    );
    currentStatusIndex = (currentStatusIndex + 1) % statusMessages.length;
    currentTypeIndex = (currentTypeIndex + 1) % statusTypes.length;
}

function heartbeat() {
    setInterval(() => {
        console.log(
            '\x1b[35m[ HEARTBEAT ]\x1b[0m',
            `Bot is alive at ${new Date().toLocaleTimeString()}`
        );
    }, 30000);
}

client.once('ready', () => {
    console.log('\x1b[36m[ INFO ]\x1b[0m', `\x1b[34mPing: ${client.ws.ping} ms \x1b[0m`);
    updateStatus();
    setInterval(updateStatus, 10000);
    heartbeat();
});

client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase() === '!gcash') {
        const gcashQrUrl = 'https://raw.githubusercontent.com/koniqtt/koniwho/refs/heads/main/koni.gif'; 

        const gcashEmbed = new MessageEmbed()
            .setTitle('GCash Account Info')
            .setDescription('Here is my GCash account info:\nAccount Name: Koni \nAccount Number: 9009090')
            .setImage(gcashQrUrl); 

        await message.channel.send({ embeds: [gcashEmbed] });
    } 

    if (message.content.toLowerCase() === '!paypal') {
        const paypalQrUrl = 'https://raw.githubusercontent.com/koniqtt/koniwho/refs/heads/main/koni.gif'; 

        const paypalEmbed = new MessageEmbed()
            .setTitle('PayPal Account Info')
            .setDescription('Here is my PayPal account info:\nPayPal Email: @example.com')
            .setImage(paypalQrUrl); 

        await message.channel.send({ embeds: [paypalEmbed] });
    } 
});

login();

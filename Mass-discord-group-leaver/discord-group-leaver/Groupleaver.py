Version = '1.7'

import discord
import webbrowser
import aiohttp
import datetime
import asyncio
import io
import requests
import json
import random
import pyperclip
from os import system
import os
from gtts import gTTS
from colorama import Fore, Style, init
init()

with open('config.json') as f:
    config = json.load(f)

from discord.ext import (
    commands,
    tasks
)

token = config.get('token')
prefix = config.get('prefix')

tts_language = "en"

Groupleaver = discord.Client()
Groupleaver = commands.Bot(description='Groupleaver Selfbot', command_prefix=prefix, self_bot=True)

if token == "ur token":
    print(f'''{Fore.BLUE}[!] {Fore.WHITE}Improper token has been passed'''+Fore.RESET)
    os.system("pause>nul")

@Groupleaver.event
async def on_ready():
    print(f'''{Fore.BLUE}
                                        
{Fore.BLUE}[+] {Fore.WHITE}Welcome To Groupleaver!
{Fore.BLUE}[+] {Fore.WHITE}Made by rezizt! Do .group-leaver To leave all groups!
''')


@Groupleaver.command(name='group-leaver',
                aliase=['leaveallgroups', 'leavegroup', 'leavegroups', "groupleave", "groupleaver"])
async def _group_leaver(ctx):
    await ctx.message.delete()
    for channel in Groupleaver.private_channels:
        if isinstance(channel, discord.GroupChannel):
            await channel.leave()

Groupleaver.run(token, bot=False)

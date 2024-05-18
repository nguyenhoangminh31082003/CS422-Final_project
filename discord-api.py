# Import the required modules
import discord
import os
from discord.ext import commands 
from dotenv import load_dotenv
from discord.ext.commands import CommandNotFound
import requests
from discord import FFmpegPCMAudio

# Create a Discord client instance and set the command prefix
intents = discord.Intents.all()
client = discord.Client(intents=intents)
bot = commands.Bot(command_prefix='!', intents=intents, case_insensitive=True,
                    help_command=commands.DefaultHelpCommand(no_category = 'Commands'),)

load_dotenv()
TOKEN=os.getenv('TOKEN')
SERVER_URL='http://103.82.194.67:8000/'

list_public_voice = [
    '4JVOFy4SLQs9my0OLhEw',
    'j9jfwdrw7BRfcR43Qohk',
    'ucTq4wzRNSiqJDhpxhUO'
]

# Set the confirmation message when the bot is ready
@bot.event
async def on_ready():
    print(f'Logged in as {bot.user.name}')

@bot.command(name='tts')
async def speak(ctx):
    def check(m):
        return m.author == ctx.author and m.channel == ctx.channel

    await ctx.send('Please upload the text:')
    text_msg = await bot.wait_for('message', check=check)

    user_id : str = 'dummy'

    await ctx.send('Please enter the voice ID:')
    voice_id_msg = await bot.wait_for('message', check=check)

    text = text_msg.content
    # description = description_msg.content
    voice_id = voice_id_msg.content

    data = {
        'user_id': user_id,
        'voice_id': voice_id,
        'text': text,
    }

    await ctx.send('Processing your request...')
    response = requests.post(SERVER_URL + 'txt2speech', json=data, stream=True)

    if response.status_code == 200:
        # Create a temporary file to save the audio
        with open('output_audio.mp3', 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        
        # Send the audio file to the user
        await ctx.send('Here is your audio file:', file=discord.File('output_audio.mp3'))
        
        # Remove the temporary file
        os.remove('output_audio.mp3')
    else:
        await ctx.channel.send('Failed to process your request. Please try again later.')
        print(response.text)



@bot.command(name='voices')
async def list_voices(ctx):
    await ctx.channel.send(
        f'```\
            Here are the available voices:\n\
            1. Luca -  calm, soothing, steady\n\
            A young adult American male with a calm, almost sober, slightly breathy way of talking. Great for voiceovers and narrations of all kinds.\n\
            id = {list_public_voice[0]}\n\
            2. Frederick Surrey - Professional, calm, well spoken\n\
            Professional, calm, well spoken British narrator full of intrigue and wonder. Suitable for Nature, Science, Mystery & History documentaries or audio books & narration projects that need a smooth & velvety tone.\n\
            id = {list_public_voice[1]}\n\
            3. Sue - fantastic for all uses\n\
            A young female british. A pleasant voice fantastic for all uses\n\
            id = {list_public_voice[2]}\n\
        ```'
    )

@bot.command(name='purge')
async def purge(ctx, limit: int = 100):
    await ctx.channel.purge(limit=limit)

bot.run(TOKEN)
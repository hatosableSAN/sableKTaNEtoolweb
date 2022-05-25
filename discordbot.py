from discord.ext import commands
from os import getenv
import traceback

bot = commands.Bot(command_prefix='!')
day=""
name=""

@bot.event
async def on_command_error(ctx, error):
    orig_error = getattr(error, "original", error)
    error_msg = ''.join(traceback.TracebackException.from_exception(orig_error).format())
    await ctx.send(error_msg)


@bot.command()
async def ping(ctx):
    await ctx.send('pong')

@bot.command()
async def makefield(ctx,day,name):
     if not day or not name:
      await ctx.send("チャンネル名が空ですよ！")
     else:

       LobbyName = day+" "+name
       Guild = ctx.guild

       # カテゴリを作成する
       Category = await Guild.create_category(LobbyName)

       # チャンネルの作成時にカテゴリを設定する
       await Category.create_text_channel("女神降臨場")
       await Category.create_text_channel("メニュー宣言ゾーン")
       await Category.create_text_channel("フリートーク")
       await ctx.send("カテゴリーを作成しました！")

# @bot.command()
# async def makefield(ctx):
#   await ctx.send("チャンネル名が空ですよ！")

@makefield.error
async def error(ctx):
      await ctx.send("チャンネル名が空ですよ！")

@bot.command()
async def roll(self,ctx):
    await ctx.send("女神さんロールよろしく！")

token = getenv('DISCORD_BOT_TOKEN')
bot.run(token)

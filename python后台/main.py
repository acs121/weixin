from flask import Flask
import urllib
import requests
import json
from flask import jsonify,request  
app = Flask(__name__)


musicVar=[]
@app.route('/myMusicList',methods=['GET'])
def index():
    musicData=request.args.get('musicOfExplore')
    word = musicData
    res1 = requests.get('https://c.y.qq.com/soso/fcgi-bin/client_search_cp?&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=20&w='+word)
    jm1 = json.loads(res1.text.strip('callback()[]'))
    jm1 = jm1['data']['song']['list']
    mids = []
    songmids = []
    srcs = []
    songnames = []
    singers = []
    music=[]
    global musicVar
    for j in jm1:
        try:
            mids.append(j['media_mid'])
            songmids.append(j['songmid'])
            songnames.append(j['songname'])
            singers.append(j['singer'][0]['name'])
        except:
            print('wrong')

    for n in range(0,len(mids)):
        res2 = requests.get('https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?&jsonpCallback=MusicJsonCallback&cid=205361747&songmid='+songmids[n]+'&filename=C400'+mids[n]+'.m4a&guid=6612300644')
        jm2 = json.loads(res2.text)
        vkey = jm2['data']['items'][0]['vkey']
        srcs.append('http://dl.stream.qqmusic.qq.com/C400'+mids[n]+'.m4a?vkey='+vkey+'&guid=6612300644&uin=0&fromtag=66')
    
    musicVar={'songname':songnames,'singer':singers,'src':srcs}
    return jsonify({'songname':songnames,'singer':singers,'src':srcs})

@app.route('/musicImfor',methods=['GET'])
def getmusicsrc():
    global musicVar
    musicId=request.args.get('id')
    return jsonify(musicVar)
if __name__ == '__main__':
    app.run(debug=True)
# jquery

事件冒泡 イベント伝播

キャプチャ　フェーズ (capture phase)=>ターゲット　フェーズ　=>　バブリング　フェーズ
document=>target=>document (window)

```ts
 event.preventDefault()
 event.stopPropagation();
 return false

 闭包closure クロージャー
 作用域链  scope chain スコープチェーン
 即時実行関数
 for(var i = 0;i++<4;){
	 setTimeout(()=>{
		log(i)
	 },0)
     
	 (function(i){
		 setTimeout(()=>{
		  log(i)
		  i = null
	    },0)
	 })(i)
 }
 垃圾回收　garbage collection  ガベージコレクション

 引用数据类型 reference data type 参照
 包装类型 ラッパー型　
```




# 工場生産設備状態管理システム
npm=>pnpm

模块路径 　module pase
绝对路径 　絶対パス　http=>https
相对路径　　相対パス

200 OK
201 Created
301 Moved Permanently
302 Found
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable

GET /DQ9MMS_API/DQ9MMS/GetPositioningArea HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,ja-JP;q=0.8,ja;q=0.7
Connection: keep-alive
Content-Type: application/json
Cookie: ESS=ESS_Runtime=XKglXPdL7LY8PRoklnVmwdu+NgkZB1unvnWwffD8Fvk=; ESS_Simulate=ESS_Simulate_Simulate=cmIWlOAck1a0nYEGeaeQsg==; pageName=%E6%A8%A1%E5%85%B7%E6%A3%80%E6%9F%A5
Host: qcscimdb.benq.corp.com:81
Referer: http://qcscimdb.benq.corp.com:81/DQ9MMS/
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36


__proto__ 暗默のprototype linkedlist 連結リスト


# 工場人員管理システム

SPA (single page application) vue-route vue-store
## route  tree 二分木（にぶんぎ　binary tree）
前順巡回
model
```ts
enum EModel{
	/**
	 * #anchor 锚点
	 * 不会重新请求服务器
	 * window.location.hash=>render不同的page
	 */
    Hash, 
    /**
	 * HTML5 HistoryAPI 浏览器的历史记录 stack
	 * 1. 点击menu
	 * 2. a标签的话, router  event.preventDefault (不发request)
	 * 3. router history.pushState("null",'/about')
	 * 4. router render
	 * 
	 * 问题：refresh 404 服务器没有(request)
	 * 解决: 服务器配置错误返回首页
	 *
	 */
	History,
    /**
	 * 非浏览器环境
	 */
	Memory


}

サブリーダー
進捗管理、ユーザーとのコミュニケーション（このやり方とかは大丈夫とか）
他のシステム管理員との問い合わせ、API、Database。



```

lazy-loading route-level-code-spliting 

树的遍历通过metaData生成Menu

 # デイリー人工チェク記録 APP

 新言語、typescript
 ```ts
　//  Vue prototype 拡張
 interface Vue{
　　axios:axios
 }
 ```
 global型
 OOP　interface,class


 ミス。
 新機能追加（Img）
 updateの時、whereを付けるのは忘れました。
 リーダーに報告して、謝って。databaseのrecovery、昨日のデータになって、
 ユーザーさん達にも頭を避けて、

 サブリーダー
 仕事の分配、困難のhearing

 # 特定データの可視化 web サイト
 js,tsの腕は優れてるとは言えないが、仕事に支障が出ない
 typescriptで勉強したOOPをC#で使い
 HTMLのセマンティックス　Semantics　HTML5
 CSS3　transform,amimation,reflow 
 Css　プリプロセッサ　Lessのmixins Nest 構造 
 CSSモジュール化
 CSSモジュール　编译器(webpack) //todo
 CSS in Js  
 Atomic CSS class量

電力消費


 # 工場生産データ可視化監視システム
 public chart component
 変動
 typescriptなし　.d.ts
 
 # キャビティー管理システム
  Vue3 
  Composition API React OOP=>函数
　this
  lifecycle=>Hooks

  マウスを使って好きな領域が描ける、
  描いたアリアをスーブでき、Selectしたら、Highlight効果したい、
  他の部分は暗くとかになる。

  性能面考えたら、domでできるか？　できると思うか。ちょっと難しい、もし以後が他のSharpが出てきたら、わかりません。
  Canvas　テーレベルは、githubの上のlibrary
  MVVM データとビュー文理 sharp
  class 
  sharp、img 比率

  ```ts
  class KnovaRectDraw{
    private stage:Konva.Stage
    private layer:Konva.Layer 
    /**
     * stage相当于原设定的相对比例
     */
    private scaleX = 1
    private scaleY = 1
    /**
     * image相对于stage的比例
     */
    private imageScaleX = 1
    private imageScaleY = 1
    private transformer: Konva.Transformer
    /**
     * 所有有效图形
     */
    public draws:Konva.Shape[]
    private currentShape:Konva.Shape = null
 
    private isDrawing = false

    constructor(dom:HTMLDivElement,scaleX = 1,scaleY = 1){
         if(!dom){
              console.error('invalid dom')
              return 
         }
         this.init(dom,scaleX,scaleY) 
    }
    private init(dom: HTMLDivElement,scaleX,scaleY){
         this.stage = new Konva.Stage({
                container:dom,
                width:dom.clientWidth,
                height:dom.clientHeight
         })
         this.layer = new Konva.Layer()
         this.stage.add(this.layer)
         this.transformer = this.createTransformer()
         this.layer.add(this.transformer)
         this.draws = []
         this.scaleX = scaleX
         this.scaleY = scaleY  
    }
    addShap(...args:Konva.Shape[]){
           args.forEach(shape=>{ 
                 shape.x(shape.x()*this.scaleX)
                 shape.y(shape.y()*this.scaleY)
                 if(shape.rotation()){
                      shape.scaleX(shape.scaleX()*this.scaleX)
                      shape.scaleY(shape.scaleY()*this.scaleY)
                 }else{
                      shape.width(shape.width()*shape.scaleX()*this.scaleX)
                      shape.height(shape.height()*shape.scaleY()*this.scaleY)
                      shape.scaleX(1)
                      shape.scaleY(1)
                 }
                 shape.on('dragend transformend',()=>{
                       this.currentShape = shape
                 })
                 shape.on('dragmove',()=>{
                   let {x,y,scaleX,scaleY,rotation} = shape.getAttrs() as Konva.RectConfig
                        /**
                         * 原始中心点位置
                         */
                        const centerPoint = {
                               x: x + shape.width()*scaleX/2,
                               y: y + shape.height()*scaleY/2
                        } 
                        /**
                         * 旋转后的中心点位置
                         */
                        const rotationPonit = KnovaRectDraw.getRotationPoint({x,y},centerPoint,rotation)


                        if(rotationPonit.x<0){
                               rotationPonit.x = 0
                               const {x} = KnovaRectDraw.getRotationPoint(rotationPonit,{x:rotationPonit.x - shape.width()*scaleX/2,y:rotationPonit.y-shape.height()*scaleY/2},rotation)
                               shape.x(x)
                        }else if(rotationPonit.x>this.stage.width()){
                               rotationPonit.x = this.stage.width()
                               const {x} =  KnovaRectDraw.getRotationPoint(rotationPonit,{x:rotationPonit.x - shape.width()*scaleX/2,y:rotationPonit.y-shape.height()*scaleY/2},rotation)
                               shape.x(x)
                        }
                        if(rotationPonit.y<0){
                             rotationPonit.y = 0
                             const {y} = KnovaRectDraw.getRotationPoint(rotationPonit,{x:rotationPonit.x - shape.width()*scaleX/2,y:rotationPonit.y-shape.height()*scaleY/2},rotation)
                             shape.y(y)
                        }else if(rotationPonit.y>this.stage.height()){
                             rotationPonit.y = this.stage.height()
                             const {y} =  KnovaRectDraw.getRotationPoint(rotationPonit,{x:rotationPonit.x - shape.width()*scaleX/2,y:rotationPonit.y-shape.height()*scaleY/2},rotation)
                             shape.y(y)
                        }
                 })
                 this.layer.add(shape)
           })
          this.draws.push(...args)
    }
    get __current(){
         if(!this.currentShape){
                ElMessage.info('没有操作过的图形')
                return
         }
         return this.currentShape
    }
    /**
     * 为了满足select的切换
     */
    set __current(shape: Konva.Shape){
      this.currentShape = shape
    }

    getBackImg(){
         const bg = this.stage.find('#background') 
         return bg && bg[0] as Konva.Image || undefined 
    }

    
    drawShape(){
       return new Promise<false|{shape:Konva.Shape,transformer:Konva.Transformer}>((resolve)=>{
            if(this.isDrawing){
                resolve(false)
                return   
            }
            this.isDrawing = true
         
          let tempshape = new Konva.Rect({
             fill: 'rgba(0,0,255,0.5)',
              visible: false,
              width:0,
              height:0
          })
          this.layer.add(tempshape)
          const basePoint = {x:0,y:0}
          
          this.stage.on('mousedown',(e)=>{
               // console.log('down');
               
               this.stage.container().style.cursor = 'crosshair'
               if((e.target!==this.stage && e.target!==this.getBackImg())  || !tempshape ){
                   return
               }
               e.evt.preventDefault()
               const {x,y} = this.stage.getPointerPosition()
               tempshape.visible(true)
               basePoint.x = x
               basePoint.y = y
          })
          this.stage.on('mousemove',(e)=>{
              if(!tempshape || !tempshape.visible()){
                   return
              }
              e.evt.preventDefault()
              const {x,y} = this.stage.getPointerPosition()
              const movepoint = {x,y}
              tempshape.setAttrs({
                    x:Math.min(movepoint.x,basePoint.x),
                    y:Math.min(movepoint.y,basePoint.y),
                    width:Math.abs(movepoint.x - basePoint.x),
                    height:Math.abs(movepoint.y - basePoint.y),
              
              })
              this.showShapOpacityBg(tempshape)

          })
          this.stage.on('mouseup',e=>{
                  this.stage.container().style.cursor = 'default'
                  if(!tempshape|| !tempshape.visible()){
                       return
                  }
                  e.evt.preventDefault()
                                
                  const resRect = new Konva.Rect({
                       ...tempshape.getAttrs(),
                       // fill:'yellow',
                       draggable:true,
                       opacity:1,
                  })
                  setTimeout(() => {
                    tempshape.visible(false)
                    tempshape.destroy()
                    tempshape = null              
                    
                  });  
                  this.layer.add(resRect)
                  //先加，如果取消在页面删
                  this.draws.push(resRect)
                  resRect.on('transform dragmove',(e)=>{
                     this.showShapOpacityBg(resRect)
                  })  
                  resRect.zIndex(2)               
                  this.setTransformerNode(resRect)
                  resolve({shape:resRect,transformer:this.transformer})
                  
          })  
       })
    }

    drawOver(){
          this.stage.off('mousedown mousemove mouseup')
          this.transformer.nodes()
          this.stage.container().style.cursor = 'default'
          this.isDrawing = false
    }

    selectShap(){
         let tempshape = new Konva.Rect({
              fill: 'rgba(0,0,255,0.5)',
               visible: false,
               width:0,
               height:0
         })
         const basePoint = {x:0,y:0}
         this.layer.add(tempshape)

         this.stage.on('mousedown',(e)=>{
               
               if(e.target!==this.stage || !tempshape){
                   return
               }
               
               e.evt.preventDefault()
               
               const {x,y} = this.stage.getPointerPosition()
               tempshape.visible(true)
               basePoint.x = x
               basePoint.y = y
          })
          this.stage.on('mousemove',(e)=>{
              if(!tempshape || !tempshape.visible()){
                   return
              }
              e.evt.preventDefault()
              const {x,y} = this.stage.getPointerPosition()
              const movepoint = {x,y}
              tempshape.setAttrs({
                    x:Math.min(movepoint.x,basePoint.x),
                    y:Math.min(movepoint.y,basePoint.y),
                    width:Math.abs(movepoint.x - basePoint.x),
                    height:Math.abs(movepoint.y - basePoint.y),
                    fill:'red',
                    
              })

          })
          this.stage.on('mouseup',e=>{
                  if(!tempshape|| !tempshape.visible()){
                       return
                  }
                  
                  e.evt.preventDefault()
                  setTimeout(() => {
                       tempshape.visible(false)
                       tempshape.destroy()
                       tempshape = null              
                       
                  });
                  // console.log(this.layer.children);
                  const resRects =  this.draws.filter(x=>{
                      return  Konva.Util.haveIntersection(tempshape.getClientRect(),x.getClientRect())
                  })
                  this.transformer.nodes(resRects)
          })
    }
    getImg(url: string){
       return new Promise<HTMLImageElement|false>(resolve=>{
          const img = new Image()
          img.src = url
          img.addEventListener('error',()=>{
               resolve(false)  
          })
          img.onload = ()=>{
               resolve(img)
          }
      })
    }
    setBackGround(url: string){
        return this.getImg(url).then(img=>{
               const bg = this.getBackImg()
               if(bg){
                     if(!img) return
                     this.imageScaleX = img.width/this.stage.width()
                     this.imageScaleY = img.height/this.stage.height()
                     bg.image(img)
               }else{
                    if(!img) return
                    const imgshape = new Konva.Image({
                         width:this.stage.width(),
                         height:this.stage.height(),
                         image:img,
                         id:'background'
                    })
                    this.imageScaleX = img.width/this.stage.width()
                    this.imageScaleY = img.height/this.stage.height()
                    this.layer.add(imgshape)
               }
          })
    }
    
    showShapOpacityBg(...shapes: Konva.Shape[]){
         const imgshape = this.getBackImg()
         imgshape && (()=>{
              imgshape.opacity(.1)
              const bgimg = imgshape.attrs.image as HTMLImageElement
              shapes.forEach(shape=>{
                   let {x,y,scaleX,scaleY,rotation,width,height} = shape.getAttrs() as Konva.RectConfig  
                   scaleX = scaleX||1
                   scaleY = scaleY||1
                   shape.setAttrs({
                                  fillPatternImage:bgimg,
                                  fillPatternRotation:-rotation||0,
                                  fillPatternOffset:{x:x*this.imageScaleX,y:y*this.imageScaleY},
                                  fillPatternScale:{
                                       x:1/this.imageScaleX,
                                       y:1/this.imageScaleY
                                  },
                                  fill:'',
                                  opacity:1,
                                  width:width*scaleX,
                                  height:height*scaleY,
                                  scaleX:1,
                                  scaleY:1,
                                  fillPatternRepeat:"no-repeat" 
                   } as Konva.ShapeConfig)
              })
         })()
         
    }
    createTransformer(){
         const tr = new Konva.Transformer({
              // rotateEnabled:false
         })
         return tr
    }
    setTransformerNode(...shapes: Konva.Shape[]){
        !this.transformer.visible() && this.transformer.visible(true)
        this.transformer.nodes(shapes)
        setTimeout(() => {
          this.transformer.zIndex(3)
        })  
        return this.transformer
    }

    resize(){
     // console.log('resize');
     
     this.stage._resizeDOM()
     console.log(this.stage.container().clientWidth);
     


    }
    destroy(){
        this.stage.destroy()
    }
    onlyShowBackImg(){
       const imgshape = this.getBackImg()
       imgshape && imgshape.opacity(1)
       this.transformer.visible(false)
       this.draws.forEach(shape=>{
            shape.visible(false)
       })
    }
    deleteShape(...shapes:Konva.Shape[]){
        this.draws.forEach((shape,index)=>{
            if(shapes.includes(shape)){
                shape.destroy()
                setTimeout(()=>{
                     this.draws.splice(index,1)
                },0)
            }
        })
    }
    /**
     * 当窗口宽高非基础stage比例时,计算基础比例
     */
    getBasicShape(...shapes:Konva.ShapeConfig[]){
       return shapes.map(shape=>{
             const x = shape.x/this.scaleX
             const y = shape.y/this.scaleY

             let scaleX = (shape.scaleX||1)/this.scaleX
             let scaleY = (shape.scaleY||1)/this.scaleY
             let width = shape.width
             let height = shape.height
             /**
              * 存在旋转的情况，缩放计算为1
              */
             if(shape.rotation){
                 width = width*scaleX
                 height = height*scaleY
                 scaleX = scaleY = 1
             }

             return {...shape,scaleX,scaleY,x,y,width,height}
        })
    }
    get isBasicSize(){
      return this.scaleX == 1 && this.scaleY == 1
    }

         /**
                         * 
                         * @param base 
                         * @param point 
                         * @param angle 
                         * 计算顺时针选择位置
                         */
    static getRotationPoint<T extends {x:number,y:number}>(base: T,point: T, angle: number){
                             return {
                                   x:(point.x - base.x)*Math.cos(angle*Math.PI/180) - (point.y - base.y)*Math.sin(angle*Math.PI/180) + base.x,
                                   y:(point.x - base.x)*Math.sin(angle*Math.PI/180) + (point.y - base.y)*Math.cos(angle*Math.PI/180) + base.y
                             }
     }
    static cos(r: number){
         return Math.cos((r||0)*Math.PI/180)
    }
    static sin(r: number){
         return Math.sin((r||0)*Math.PI/180)
    }
    static instance(dom: HTMLDivElement,scaleX = 1,scaleY = 1){
         return new KnovaRectDraw(dom,scaleX,scaleY)
    }

}
  ```
  

  
  # OOP

  继承 けいしょう
  封装 カプセル化
  多态 ポリモーフィズム
  抽象 ちゅうしょうか 







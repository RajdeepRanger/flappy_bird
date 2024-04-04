(()=>{"use strict";var e,t={494:(e,t,s)=>{var i=s(260),n=s.n(i);class r extends n().Scene{constructor(e,t){super(e),this.config=t,this.screenCentre=[t.width/2,t.height/2]}create(){if(this.add.image(0,0,"sky").setOrigin(0),this.config.canGoBack){this.add.image(this.config.width-10,this.config.height-10,"back").setOrigin(1).setScale(2).setInteractive().on("pointerup",(()=>{this.scene.start("MenuScene")}))}}createMenu(e,t){let s=0;e.forEach((e=>{const i=[this.screenCentre[0],this.screenCentre[1]+s];e.textGO=this.add.text(...i,e.text,{fontsize:"32px",fill:"#fFF"}).setOrigin(.5),s+=42,t(e)}))}}const a=r;const c=class extends a{constructor(e){super("PlayScene",e),this.bird=null,this.pipes=null,this.isPaused=!1,this.pipeHorizontalDistance=0,this.flapVelocity=-300,this.score=0,this.scoreText="",this.currentDifficulty="easy",this.difficulties={easy:{pipeHorizontalDistanceRange:[300,350],pipeVerticalDistanceRange:[150,200]},normal:{pipeHorizontalDistanceRange:[280,330],pipeVerticalDistanceRange:[140,190]},hard:{pipeHorizontalDistanceRange:[250,310],pipeVerticalDistanceRange:[50,100]}}}create(){this.currentDifficulty="easy",super.create(),this.createBird(),this.createPipes(),this.handleInputs(),this.createColliders(),this.createScore(),this.createPause(),this.listenToEvents(),this.anims.create({key:"fly",frames:this.anims.generateFrameNumbers("bird",{start:9,end:15}),frameRate:8,repeat:-1}),this.bird.play("fly"),this.increaseDifficulty()}increaseDifficulty(){1===this.score&&(this.currentDifficulty="normal"),3===this.score&&(this.currentDifficulty="hard")}update(){this.checkGameStatus(),this.recyclePipes()}listenToEvents(){this.pauseEvent||(this.pauseEvent=this.events.on("resume",(()=>{this.initialTime=3,this.countDownText=this.add.text(this.config.width/2,this.config.height/2,"Fly in: "+this.initialTime,{fontSize:"16px",fill:"#FFF"}).setOrigin(.5),this.timedEvent=this.time.addEvent({delay:1e3,callback:this.countDown,callbackScope:this,loop:!0})})))}countDown(){this.initialTime--,this.countDownText.setText("Fly in: "+this.initialTime),this.initialTime<=0&&(this.isPaused=!1,this.countDownText.setText(""),this.physics.resume(),this.timedEvent.remove())}createBG(){this.add.image(0,0,"sky").setOrigin(0)}createBird(){this.bird=this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y,"bird").setFlipX(!0).setScale(3).setOrigin(0),this.bird.setBodySize(this.bird.width,this.bird.height-8),this.bird.body.gravity.y=600,this.bird.setCollideWorldBounds(!0)}createPipes(){this.pipes=this.physics.add.group();for(let e=0;e<4;e++){const e=this.pipes.create(0,0,"pipe").setImmovable(!0).setOrigin(0,1),t=this.pipes.create(0,0,"pipe").setImmovable(!0).setOrigin(0,0);this.placePipe(e,t)}this.pipes.setVelocityX(-200)}createColliders(){this.physics.add.collider(this.bird,this.pipes,this.gameOver,null,this)}createScore(){this.score=0;const e=localStorage.getItem("bestScore");this.scoreText=this.add.text(16,16,"Score 0",{fontSize:"32px",fill:"#fff"}),this.add.text(16,52,` Best Score: ${e||0}`,{fontsize:"18px",fill:"#fff"})}createPause(){this.isPaused=!1;const e=this.add.image(this.config.width-10,this.config.height-10,"pause").setOrigin(1).setScale(2);e.setInteractive(),e.on("pointerdown",(()=>{this.isPaused=!0,this.physics.pause(),this.scene.pause(),this.scene.launch("PauseScene")}))}handleInputs(){this.input.on("pointerdown",this.flap,this),this.input.keyboard.on("keydown-J",this.flap,this),this.input.keyboard.on("keydown-SPACE",this.flap,this)}checkGameStatus(){(this.bird.getBounds().bottom>=this.config.height||this.bird.y<=0)&&this.gameOver()}placePipe(e,t){const s=this.difficulties[this.currentDifficulty],i=this.getRightMostPipe(),n=Phaser.Math.Between(...s.pipeVerticalDistanceRange),r=(Phaser.Math.Between(20,this.config.height-20-n),Phaser.Math.Between(...s.pipeHorizontalDistanceRange));e.x=i+r,e.y=n,t.x=e.x,t.y=e.y+n}recyclePipes(){const e=[];this.pipes.getChildren().forEach((t=>{t.getBounds().right<=0&&(e.push(t),2===e.length&&(this.placePipe(...e),this.increaseScore(),this.saveBestScore()))}))}getRightMostPipe(){let e=0;return this.pipes.getChildren().forEach((function(t){e=Math.max(t.x,e)})),e}saveBestScore(){const e=localStorage.getItem("bestScore"),t=e&&parseInt(e,10);(!t||this.score>t)&&localStorage.setItem("bestScore",this.score)}gameOver(){this.physics.pause(),this.bird.setTint(15616036),this.saveBestScore(),this.time.addEvent({delay:1e3,callback:()=>{this.scene.restart()},loop:!1})}flap(){this.isPaused||(this.bird.body.velocity.y=this.flapVelocity)}increaseScore(){this.score++,this.scoreText.setText(`score: ${this.score}`)}};const o=class extends a{constructor(e){super("MenuScene",e),this.menu=[{scene:"PlayScene",text:"Play"},{scene:"ScoreScene",text:"Score"},{scene:null,text:"Exit"}]}create(){super.create(),this.createMenu(this.menu,this.setupMenuEvents.bind(this))}setupMenuEvents(e){const t=e.textGO;this.add.text(this.config.width/3,this.config.height-20,"Programmed by Rajdeep Singh",{fontsize:"32px",fill:"#fff"}),t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fontsize:"32px",fill:"#fF0"})})),t.on("pointerout",(()=>{t.setStyle({fontsize:"32px",fill:"#fFf"})})),t.on("pointerup",(()=>{e.scene&&this.scene.start(e.scene),"Exit"===e.text&&this.game.destroy(!0)}))}};class h extends n().Scene{constructor(e){super("PreloadScene"),this.config=e}preload(){this.load.image("sky","assets/sky.png"),this.load.spritesheet("bird","assets/birdSprite.png",{frameWidth:16,frameHeight:16}),this.load.image("pipe","assets/pipe.png"),this.load.image("pause","assets/pause.png"),this.load.image("back","assets/back.png")}create(){this.scene.start("MenuScene")}}const l=h;const p=class extends a{constructor(e){super("ScoreScene",{...e,canGoBack:!0})}create(){super.create();const e=localStorage.getItem("bestScore");this.add.text(...this.screenCentre,`Score: ${e||0}`,{fontsize:"32px",fill:"#fFF"}).setOrigin(.5)}};const d=class extends a{constructor(e){super("PauseScene",e),this.menu=[{scene:"PlayScene",text:"Continue"},{scene:"Exit",text:"Exit"}]}create(){super.create(),this.createMenu(this.menu,this.setupMenuEvents.bind(this))}setupMenuEvents(e){const t=e.textGO;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fontsize:"32px",fill:"#fF0"})})),t.on("pointerout",(()=>{t.setStyle({fontsize:"32px",fill:"#fFf"})})),t.on("pointerup",(()=>{console.log("Clicking on some option!"),e.scene&&"Continue"===e.text?(this.scene.stop(),this.scene.resume(e.scene)):(this.scene.stop("PlayScene"),this.scene.start(e.scene))}))}},u={width:400,height:600,startPosition:{x:40,y:300}},f={type:n().AUTO,...u,pixelArt:!0,physics:{default:"arcade",arcade:{}},scene:[l,new o(u),new c(u),new d(u),new p(u)]};new(n().Game)(f)}},s={};function i(e){var n=s[e];if(void 0!==n)return n.exports;var r=s[e]={exports:{}};return t[e].call(r.exports,r,r.exports,i),r.exports}i.m=t,e=[],i.O=(t,s,n,r)=>{if(!s){var a=1/0;for(l=0;l<e.length;l++){for(var[s,n,r]=e[l],c=!0,o=0;o<s.length;o++)(!1&r||a>=r)&&Object.keys(i.O).every((e=>i.O[e](s[o])))?s.splice(o--,1):(c=!1,r<a&&(a=r));if(c){e.splice(l--,1);var h=n();void 0!==h&&(t=h)}}return t}r=r||0;for(var l=e.length;l>0&&e[l-1][2]>r;l--)e[l]=e[l-1];e[l]=[s,n,r]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={143:0};i.O.j=t=>0===e[t];var t=(t,s)=>{var n,r,[a,c,o]=s,h=0;if(a.some((t=>0!==e[t]))){for(n in c)i.o(c,n)&&(i.m[n]=c[n]);if(o)var l=o(i)}for(t&&t(s);h<a.length;h++)r=a[h],i.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return i.O(l)},s=self.webpackChunkphaser_webpack_boilerplate=self.webpackChunkphaser_webpack_boilerplate||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var n=i.O(void 0,[736],(()=>i(494)));n=i.O(n)})();
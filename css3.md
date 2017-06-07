- border-radius

- box-shadow

- border-image

- background-size

- background-origin

- background-clip

- linear-gradient

- repeating-linear-gradient

重复的线性渐变

- radial-gradient

- repeating-radial-gradient

重复的径向渐变

- text-shadow

- text-overflow

- word-wrap/word-break

- @font-face

- transform

translate()
值：
rotate()

scale()

skew()

matrix()

matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)

translate3d(x,y,z)

translateX(x)

translateY(y)

translateZ(z)

scale3d(x,y,z)

scaleX(x)

scaleY(y)

scaleZ(z)	

rotate3d(x,y,z,angle)	

rotateX(angle)	

rotateY(angle)	

rotateZ(angle)	

perspective(n) 定义 3D 转换元素的透视视图


效果：

transform-origin:

transform-style:

perspective：

perspective-origin：

backface-visibility：


- transition

transition-property: width;

transition-duration: 1s;

transition-timing-function: linear;
    
transition-delay: 2s;


- animation

animation-name	规定 @keyframes 动画的名称

animation-duration	规定动画完成一个周期所花费的秒或毫秒。默认是 0

animation-timing-function	规定动画的速度曲线。默认是 "ease"

animation-delay	规定动画何时开始。默认是 0

animation-iteration-count	规定动画被播放的次数。默认是 1

animation-direction	规定动画是否在下一周期逆向地播放。默认是 "normal"

animation-play-state	规定动画是否正在运行或暂停。默认是 "running"

@keyframes animation
{
    0%   {background: red;}
    25%  {background: yellow;}
    50%  {background: blue;}
    100% {background: green;}
}

- column

column-count	指定元素应该被分割的列数

column-fill	指定如何填充列

column-gap	指定列与列之间的间隙

column-rule	所有 column-rule-* 属性的简写

column-rule-color	指定两列间边框的颜色

column-rule-style	指定两列间边框的样式

column-rule-width	指定两列间边框的厚度

column-span	指定元素要跨越多少列

column-width	指定列的宽度

columns	设置 column-width 和 column-count 的简写


- outline-offset

外轮廓修饰并绘制超出边框的边缘

- filter

blur(px)	给图像设置高斯模糊。"radius"一值设定高斯函数的标准差，或者是屏幕上以多少像素融在一起， 所以值越大越模糊；
如果没有设定值，则默认是0；这个参数可设置css长度值，但不接受百分比值。

brightness(%)	给图片应用一种线性乘法，使其看起来更亮或更暗。如果值是0%，图像会全黑。值是100%，则图像无变化。其他的值对应线性乘数效果。值超过100%也是可以的，图像会比原来更亮。如果没有设定值，默认是1。

contrast(%)	调整图像的对比度。值是0%的话，图像会全黑。值是100%，图像不变。值可以超过100%，意味着会运用更低的对比。若没有设置值，默认是1。

drop-shadow(h-shadow v-shadow blur spread color)	
给图像设置一个阴影效果。阴影是合成在图像下面，可以有模糊度的，可以以特定颜色画出的遮罩图的偏移版本。 函数接受<shadow>(在CSS3背景中定义)类型的值，除了"inset"关键字是不允许的。该函数与已有的box-shadow box-shadow属性很相似；不同之处在于，通过滤镜，一些浏览器为了更好的性能会提供硬件加速。<shadow>参数如下：

<offset-x> <offset-y> (必须)
这是设置阴影偏移量的两个 <length>值. <offset-x> 设定水平方向距离. 负值会使阴影出现在元素左边. <offset-y>设定垂直距离.负值会使阴影出现在元素上方。查看<length>可能的单位.
如果两个值都是0, 则阴影出现在元素正后面 (如果设置了 <blur-radius> and/or <spread-radius>，会有模糊效果).

<blur-radius> (可选)
这是第三个code><length>值. 值越大，越模糊，则阴影会变得更大更淡.不允许负值 若未设定，默认是0 (则阴影的边界很锐利).

<spread-radius> (可选)
这是第四个 <length>值. 正值会使阴影扩张和变大，负值会是阴影缩小.若未设定，默认是0 (阴影会与元素一样大小). 
注意: Webkit, 以及一些其他浏览器 不支持第四个长度，如果加了也不会渲染。
 
<color> (可选)
查看 <color>该值可能的关键字和标记。若未设定，颜色值基于浏览器。在Gecko (Firefox), Presto (Opera)和Trident (Internet Explorer)中， 会应用colorcolor属性的值。另外, 如果颜色值省略，WebKit中阴影是透明的。

grayscale(%)	
将图像转换为灰度图像。值定义转换的比例。值为100%则完全转为灰度图像，值为0%图像无变化。值在0%到100%之间，则是效果的线性乘子。若未设置，值默认是0；

hue-rotate(deg)	
给图像应用色相旋转。"angle"一值设定图像会被调整的色环角度值。值为0deg，则图像无变化。若值未设置，默认值是0deg。该值虽然没有最大值，超过360deg的值相当于又绕一圈。

invert(%)	
反转输入图像。值定义转换的比例。100%的价值是完全反转。值为0%则图像无变化。值在0%和100%之间，则是效果的线性乘子。 若值未设置，值默认是0。

opacity(%)	
转化图像的透明程度。值定义转换的比例。值为0%则是完全透明，值为100%则图像无变化。值在0%和100%之间，则是效果的线性乘子，也相当于图像样本乘以数量。 若值未设置，值默认是1。该函数与已有的opacity属性很相似，不同之处在于通过filter，一些浏览器为了提升性能会提供硬件加速。

saturate(%)	
转换图像饱和度。值定义转换的比例。值为0%则是完全不饱和，值为100%则图像无变化。其他值，则是效果的线性乘子。超过100%的值是允许的，则有更高的饱和度。 若值未设置，值默认是1。

sepia(%)	
将图像转换为深褐色。值定义转换的比例。值为100%则完全是深褐色的，值为0%图像无变化。值在0%到100%之间，则是效果的线性乘子。若未设置，值默认是0；

url()	
URL函数接受一个XML文件，该文件设置了 一个SVG滤镜，且可以包含一个锚点来指定一个具体的滤镜元素。


- flex

*flex-direction: row|row-reverse|column|column-reverse*

row	默认值。灵活的项目将水平显示，正如一个行一样

row-reverse	与 row 相同，但是以相反的顺序

column	灵活的项目将垂直显示，正如一个列一样

column-reverse	与 column 相同，但是以相反的顺序

justify-content: flex-start|flex-end|center|space-between|space-around

flex-start	默认值。项目位于容器的开头

flex-end	项目位于容器的结尾

center	项目位于容器的中心

space-between	项目位于各行之间留有空白的容器内

space-around	项目位于各行之前、之间、之后都留有空白的容器内


*align-items: stretch|center|flex-start|flex-end|baseline*

stretch	默认值。项目被拉伸以适应容器

center	项目位于容器的中心

flex-start	项目位于容器的开头

flex-end	项目位于容器的结尾

baseline	项目位于容器的基线上


*flex-wrap: nowrap|wrap|wrap-reverse*

nowrap	默认值。规定灵活的项目不拆行或不拆列

wrap	规定灵活的项目在必要的时候拆行或拆列

wrap-reverse	规定灵活的项目在必要的时候拆行或拆列，但是以相反的顺序

*align-content: stretch|center|flex-start|flex-end|space-between|space-around*

stretch	默认值。项目被拉伸以适应容器

center	项目位于容器的中心

flex-start	项目位于容器的开头

flex-end	项目位于容器的结尾

space-between	项目位于各行之间留有空白的容器内

space-around	项目位于各行之前、之间、之后都留有空白的容器内

flex-flow: flex-direction flex-wrap

flex-direction	可能的值：row|row-reverse|column|column-reverse

flex-wrap	可能的值：nowrap|wrap|wrap-reverse

order: number 默认值是 0

*align-self: auto|stretch|center|flex-start|flex-end|baseline*

auto	默认值。元素继承了它的父容器的 align-items 属性。如果没有父容器则为 "stretch"

stretch	元素被拉伸以适应容器

center	元素位于容器的中心

flex-start	元素位于容器的开头

flex-end	元素位于容器的结尾

baseline	元素位于容器的基线上

*flex: flex-grow flex-shrink flex-basis|auto*

flex-grow	一个数字，规定项目将相对于其他灵活的项目进行扩展的量

flex-shrink	一个数字，规定项目将相对于其他灵活的项目进行收缩的量

flex-basis	项目的长度。合法值："auto"、"inherit" 或一个后跟 "%"、"px"、"em" 或任何其他长度单位的数字

auto	与 1 1 auto 相同

none	与 0 0 auto 相同

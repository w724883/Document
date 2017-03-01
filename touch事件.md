#移动端的touch事件
当手指触碰屏幕是事件的发生顺序touchstart,touchmove,touchend,touchcancel,click

监听事件可以获取event对象，包含pageX,pageY等属性，

clientX：触摸目标在视口中的x坐标。

clientY：触摸目标在视口中的y坐标。

identifier：标识触摸的唯一ID。

pageX：触摸目标在页面中的x坐标。

pageY：触摸目标在页面中的y坐标。

screenX：触摸目标在屏幕中的x坐标。

screenY：触摸目标在屏幕中的y坐标。

target：触目的DOM节点目标。

并且可以阻止冒泡event.preventDefault()

touchcancel实在系统发生cancel时触发，比如触摸的过程中唤出电话界面

event有三个属性：

touches是在屏幕上的所有手指列表，

targetTouches是当前DOM上的手指列表，

changedTouches是当手指移开触发touchend事件当前屏幕上的手指列表，并且touchend时没有targetTouches列表

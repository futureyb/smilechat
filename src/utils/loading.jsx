import { createApp, createElementVNode } from 'vue'

import { styled } from '@styils/vue';

const model_box = styled('div', {
    position: 'fixed',
    zIndex: 9999,
    background: '#d4c3fc',
    borderRadius: '5px',
    paddingBottom: '10px'
})


const model_main = styled('div', {
    padding: '10px 10px 0 10px',
    boxSizing: 'border-box',
    backgroundColor: '#d4c3fc',
    borderRadius: '5px',
    transform: "all .5s"
})

const messagebox = {
    name:'messagebox',
    props: {
        content: {
            type: Array,
        },
        x: {
            type: Number
        },
        y: {
            type: Number
        },
        onClose: Function,
    },
    mounted(){
        // 添加点击事件,点击到其他地方时，取消右键
        document.addEventListener('click', this.onClose);
    },
    beforeUnmount() {
        //被销毁前移除该点击事件
        document.removeEventListener('click', this.onClose);
    },

    handleClickInside(item){
        emitRef.value('modelMainClick', item); // 使用 ref 中的 emit 函数
    },

    render(ctx) {
        let { $props, $emit } = ctx
        let dynamicStyle = {
            top: $props.y + 'px',
            left: $props.x + 'px',
        }

        let handel = (e)=>{
            $emit('aa','23')
            e.stopPropagation()
        }

        return (
            <div>
                <model_box style={dynamicStyle}>
                    {$props.content.map((item, index) => (
                        <model_main key={index} onClick={item.cab(item)} >{item.item}</model_main>
                    ))}
                </model_box>
            </div>
        )

    }
   
}


let app

const showMsg = (content, x, y) => {

    let close = () => {
        app.unmount();
        app._container.remove();
    }
    if (app) {
        close()
    }
    let div = document.createElement('div')
    document.body.appendChild(div)
    app = createApp(messagebox, {
        content,
        x,
        y,
        onClose: close
    })
    const instance = app.mount(div); 
    
    return {
        instance,
        close
    }
}
export default showMsg


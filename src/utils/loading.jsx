import { createApp, createElementVNode } from 'vue'

import { styled } from '@styils/vue';

const model_box = styled('div', {
    position: 'fixed',
    zIndex: 9999,
    background:'#d4c3fc',
    borderRadius:'5px'
})


const model_main = styled('div', {
    padding: '10px',
    boxSizing: 'border-box',
    backgroundColor: '#d4c3fc',
    borderRadius: '5px',
    transform: "all .5s"
})

const messagebox = {
    props: {
        msg: {
            type: String,
            default: '加载中'
        }
    },

    dynamicStyle :{
        color: 'red',
    },
    render(ctx) {
        let { $props, $emit } = ctx
        console.log($props)
        let dynamicStyle ={
            top:$props.msg.y + 'px',
            left:$props.msg.x + 'px',
        }
        return (<model_box style={dynamicStyle}>
            <model_main >{$props.msg.content}</model_main>

            <model_main >{$props.msg.content}</model_main>
        </model_box>)

    }
}


const showMsg = (content, x, y) => {
    let close=()=>{
        app.unmount(div)
        div.remove()
    }
    let div = document.createElement('div')
    document.body.appendChild(div)
    let app = createApp(messagebox, {
        msg: {
            content,
            x,
            y
        },
        aa: "322"

    })
    app.mount(div)
    return {
        close
    }
}
export default showMsg
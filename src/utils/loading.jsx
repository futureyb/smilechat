import { createApp, createElementVNode } from 'vue'

import { styled } from '@styils/vue';

const model_box = styled('div', {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
})

const model_main = styled('div', {
    padding: '10px',
    boxSizing: 'border-box',
    backgroundColor: '#d4c3fc',
    borderRadius: '5px'
})



const messagebox = {
    props: {
        msg: {
            type: String,
            default: '加载中'
        }
    },
    render(ctx) {
        let { $props, $emit } = ctx
        return (<model_box>
            <model_main >{$props.msg}</model_main>
        </model_box>)

    }
}


const showMsg = (msg, fn) => {
    let div = document.createElement('div')
    document.body.appendChild(div)
    let app = createApp(messagebox, {
        msg
    })
    app.mount(div)
    return {
        close() {
            app.unmount(div)
            div.remove()
        }
    }
}
export default showMsg
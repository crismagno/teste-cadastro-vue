<template>
    <footer class="footer" v-if="visivel" >
        <span>Copyright 
            <strong>
                <a href="http://github.com/crismagno" target="_blank">github </a>    
            </strong> 2018-2019</span>
    </footer>
</template>

<script>
export default {
    props: { visivel: Boolean }
}
</script>

<style>

    .visivel {
        display: none;
    }

    .footer{
        background-color: #DDD;
        color: #333;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0px 10px;
        border-top: 1px solid rgba(0,0,0,.3);
        grid-area: footer;
    }
</style>

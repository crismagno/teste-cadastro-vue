<template>
    <div class="stat">
        <div class="stat-icon">
            <i :class="icon" :style="style"></i>
        </div>
        <div class="stat-info">
            <span class="stat-title">{{title}}</span>
            <span class="stat-value">{{value}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['icon', 'color', 'title', 'value'],
    computed: {
        style(){
            return "color:" + (this.color || "#000")
        }
    }
}
</script>

<style>

    .stat{
        flex: 1;
        display: flex;
        /* justify-content: space-between; */
        border-radius: 8px;
        background-color: #fff;
        margin-bottom: 15px;
        margin-right: 15px;
        padding: 15px;
        border: 1px solid rgba(0,0,0,.2);
        box-shadow: 0px 1px 5px rgba(0,0,0,.15)
    }

    .stat-icon {
        font-size: 50px;
    }

    .stat-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .stat-title {
        font-size: 1.5rem;
    }

    .stat-value {
        font-size: 3rem;
    }

</style>

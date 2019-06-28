<template>
    <div class="page-title">
        <h3>
            <i :class="icon"></i>
            {{title}}
        </h3>
        <h5>{{sub}}</h5>
        <hr>
    </div>
</template>

<script>
export default {
    props: ['title', 'icon', 'sub' ]
}
</script>

<style>

</style>

<template>
    <div class="dashboard">
        <Pagetitle title="Dashboard" 
            sub="Base de conhecimento" icon="fa fa-home" />

        <div class="stats">
            <Stat title="Categorias" value="10" icon="fa fa-folder" color="#d54d50" />
            <Stat title="Artigos" value="10" icon="fa fa-file" color="#3bc480" />
            <Stat title="Usuarios" value="10" icon="fa fa-user" color="#3282cd" />
        </div>
    </div>
</template>

<script>

import Stat from "../widget/Stat";
import Pagetitle from "../template/Pagetitle";

export default {
    name: 'Dashboard',
    components: { Stat, Pagetitle }
}
</script>

<style>

    .stats{
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }

</style>

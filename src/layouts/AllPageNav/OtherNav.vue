<template id="page-top">
    <!-- Navigation-->
    <v-layout :full-height="true">
    <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
        <div class="container px-2 px-lg-4">
            <NavDrawer class="mr-0"/>
            <div class="d-flex justify-content-center text-center align-self-center">
            <RouterLink :to="{ name: 'home', hash: '#about' }" class="navbar-brand">Pharma-Save</RouterLink>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ms-auto my-2 my-lg-0">
                    <!-- <li class="nav-item"><a class="nav-link" href="#services">Status</a></li> -->
                </ul>
            </div>
        </div>
    </div>
    </nav>
    <DefaultView :full-height="true"/> 
</v-layout>
</template>

<script setup>
import DefaultView from "../default/View.vue"
import NavDrawer from "@/components/LoginFeatures/UserNavDrawer.vue"
</script>
<script setup></script>

<template>
  <v-row>
    <v-col cols="12" sm="12" md="4">
      <slot name="sidebar" />
    </v-col>
    <v-col>
      <slot name="main" />
    </v-col>
  </v-row>
</template>

<style></style>

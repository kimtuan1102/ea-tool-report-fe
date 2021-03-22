<template>
  <v-container
    id="settings-view"
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <v-fab-transition>
          <v-btn
            fab
            large
            bottom
            right
            class="v-btn--example"
            @click="openDialogAddPackage"
          >
            <v-icon color="primary">
              mdi-plus
            </v-icon>
          </v-btn>
        </v-fab-transition>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="({ ...attrs }, i) in packages"
        :key="i"
        cols="12"
        md="6"
        lg="3"
      >
        <material-stat-card v-bind="attrs">
          <template #actions>
            <v-btn
              text
              style="text-transform: none"
              @click="openDialogEditPackage(packages[i])"
            >
              <v-icon
                left
                color="primary"
              >
                mdi-pencil
              </v-icon>
              Sửa
            </v-btn>
            <v-btn
              text
              style="text-transform: none"
              @click="deletePackageById({packageId: packages[i]._id})"
            >
              <v-icon
                left
                color="accent"
              >
                mdi-trash-can-outline
              </v-icon>
              Xóa
            </v-btn>
          </template>
        </material-stat-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'Settings',
    computed: {
      ...mapState('package', ['packages']),
    },
    mounted () {
      this.getAllPackages()
    },
    methods: {
      ...mapActions('dialog', ['openDialogAddPackage', 'openDialogEditPackage']),
      ...mapActions('package', ['getAllPackages', 'deletePackageById']),
    },
  }
</script>

<style scoped>
</style>

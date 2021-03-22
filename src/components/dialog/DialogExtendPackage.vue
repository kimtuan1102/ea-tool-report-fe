<template>
  <v-dialog
    v-model="showDialogExtendPackage"
    max-width="300"
  >
    <v-card>
      <v-card-title>
        Gia hạn tài khoản
        <v-spacer />

        <v-icon
          aria-label="Close"
          @click="closeDialogExtendPackage"
        >
          mdi-close
        </v-icon>
      </v-card-title>

      <v-card-text class="text-body-1 text-center">
        <v-form>
          <v-combobox
            v-model="packageSelected"
            :items="packageItems"
            item-text="name"
            item-value="value"
            :error-messages="packageSelectedErrors"
            required
            label="Gói"
            @input="$v.packageSelected.$touch()"
            @blur="$v.packageSelected.$touch()"
          />
          <v-btn
            class="mt-6"
            color="primary"
            depressed
            default
            rounded
            style="text-transform: none"
            @click="submit"
          >
            Gia hạn
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapFields } from 'vuex-map-fields'
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  export default {
    name: 'DialogExtendPackage',
    mixins: [validationMixin],
    validations: {
      packageSelected: { required },
    },
    data: () => ({
      packageSelected: '',
      packageItems: [
        {
          id: 1,
          name: '1 Tháng',
          value: 1,
        },
        {
          id: 2,
          name: '3 Tháng',
          value: 3,
        },
      ],
    }),
    computed: {
      ...mapFields('dialog', ['showDialogExtendPackage']),
      ...mapFields('package', { extendPackageAccountId: 'extendPackage.accountId', extendPackageMonth: 'extendPackage.month' }),
      packageSelectedErrors () {
        const errors = []
        if (!this.$v.packageSelected.$dirty) return errors
        !this.$v.packageSelected.required && errors.push('Trường thông tin gói là bắt buộc')
        return errors
      },
    },
    methods: {
      ...mapActions('dialog', ['closeDialogExtendPackage']),
      ...mapActions('package', ['extendPackage']),
      submit (item) {
        this.$v.$touch()
        if (this.$v.$error) return
        this.extendPackageMonth = this.packageSelected.value
        this.extendPackage()
      },
    },
  }
</script>

<style scoped>

</style>

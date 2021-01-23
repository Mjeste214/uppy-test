<template>
        <div class="p-3 bg-white shadow rounded-lg">
            <input type="file" name="image" accept="image/*" @change="setImage" />

            <!-- Image previewer -->
            <img :src="imageSrc" width="50" />

            <!-- Cropper container -->
            <div v-if="this.imageSrc"
                class="my-3 d-flex align-items-center justify-content-center mx-auto" style="width: 500px">
                <vue-cropper
                    class="mr-2 w-50"
                    ref="cropper"
                    :view-mode="2"
                    :guides="true"
                    :src="imageSrc"
                    :aspectRatio="1/1"
                ></vue-cropper>
                <!-- Cropped image previewer -->
                <img class="ml-2 w-50 bg-light" :src="croppedImageSrc" />
            </div>
            <button v-if="this.imageSrc" @click="cropImage">Crop</button>
            <button v-if="this.croppedImageSrc" @click="uploadImage">Upload</button>

            <b-modal ref="my-modal" hide-footer title="Using Component Methods">
                <div class="d-block text-center">
                    <h3>Hello From My Modal!</h3>
                    <h3>Hello From My Modal!</h3>
                    <h3>Hello From My Modal!</h3>
                    <h3>Hello From My Modal!</h3>
                    <h3>Hello From My Modal!</h3>
                </div>
                <b-button class="mt-3" variant="outline-danger" block >Close Me</b-button>
                <b-button class="mt-2" variant="outline-warning" block >Toggle Me</b-button>
            </b-modal>

        </div>
</template>

<script>

import Vue from 'vue';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.component(VueCropper);

export default {
    components: {
        VueCropper
    },
    data:function (){
        return {
            imageSrc: "",
            croppedImageSrc: "",
        }
    },
    methods: {
        setImage:function (e){
            const file = e.target.files[0]
            if (!file.type.includes("image/")) {
                alert("Please select an image file")
                return
            }
            if (typeof FileReader === "function") {
                const reader = new FileReader()
                reader.onload = event => {
                    this.imageSrc = event.target.result

                    // Rebuild cropperjs with the updated source
                    this.$refs.cropper.replace(event.target.result)
                }
                reader.readAsDataURL(file)
            } else {
                alert("Sorry, FileReader API not supported")
            }
        },
        cropImage() {
            // Get image data for post processing, e.g. upload or setting image src
            this.croppedImageSrc = this.$refs.cropper.getCroppedCanvas().toDataURL()
        },
        uploadImage() {
            this.$refs.cropper.getCroppedCanvas().toBlob(function (blob) {
                let formData = new FormData()

                // Add name for our image
                formData.append("name", "image-name-" + new Date().getTime())

                // Append image file
                formData.append("file", blob)

                axios
                    .post("/api/store", formData)
                    .then(response => {
                        console.log(response.data)
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            })
        },
    },
}

</script>

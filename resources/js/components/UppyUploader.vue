<template>
    <!--    <div class="p-3 bg-white shadow rounded-lg">-->
    <!--        <input type="file" name="image" accept="image/*" @change="setImage" />-->

    <!--        &lt;!&ndash; Image previewer &ndash;&gt;-->
    <!--        <img :src="imageSrc" width="100" />-->

    <!--        &lt;!&ndash; Cropper container &ndash;&gt;-->
    <!--        <div-->
    <!--            v-if="this.imageSrc"-->
    <!--            class="my-3 d-flex align-items-center justify-content-center mx-auto"-->
    <!--        >-->
    <!--            <vue-cropper-->
    <!--                class="mr-2 w-50"-->
    <!--                ref="cropper"-->
    <!--                :guides="true"-->
    <!--                :src="imageSrc"-->
    <!--            ></vue-cropper>-->

    <!--            &lt;!&ndash; Cropped image previewer &ndash;&gt;-->
    <!--            <img class="ml-2 w-50 bg-light" :src="croppedImageSrc" />-->
    <!--        </div>-->
    <!--        <button v-if="this.imageSrc" @click="cropImage">Crop</button>-->
    <!--        <button v-if="this.croppedImageSrc" @click="uploadImage">Upload</button>-->
    <!--    </div>-->

<div class="DashboardContainer" style="width: 100%"></div>
</template>

<script>
import 'cropperjs/dist/cropper.css';
import '@uppy/image-editor/dist/style.css'
// import {Dashboard} from '@uppy/vue'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
// import Uppy from '@uppy/core'
// import Webcam from '@uppy/webcam'
// import ImageEditor from '@uppy/image-editor'


// export default {
//     // components: {
//     //     VueCropper
//     // },
//     // data:function (){
//     //     return {
//     //         imageSrc: "",
//     //         croppedImageSrc: "",
//     //     }
//     // },
//     // methods: {
//     //     setImage:function (e){
//     //         const file = e.target.files[0]
//     //         if (!file.type.includes("image/")) {
//     //             alert("Please select an image file")
//     //             return
//     //         }
//     //         if (typeof FileReader === "function") {
//     //             const reader = new FileReader()
//     //             reader.onload = event => {
//     //                 this.imageSrc = event.target.result
//     //
//     //                 // Rebuild cropperjs with the updated source
//     //                 this.$refs.cropper.replace(event.target.result)
//     //             }
//     //             reader.readAsDataURL(file)
//     //         } else {
//     //             alert("Sorry, FileReader API not supported")
//     //         }
//     //     },
//     //     cropImage() {
//     //         // Get image data for post processing, e.g. upload or setting image src
//     //         this.croppedImageSrc = this.$refs.cropper.getCroppedCanvas().toDataURL()
//     //     },
//     //     uploadImage() {
//     //         this.$refs.cropper.getCroppedCanvas().toBlob(function (blob) {
//     //             let formData = new FormData()
//     //
//     //             // Add name for our image
//     //             formData.append("name", "image-name-" + new Date().getTime())
//     //
//     //             // Append image file
//     //             formData.append("file", blob)
//     //
//     //             axios
//     //                 .post("/api/store", formData)
//     //                 .then(response => {
//     //                     console.log(response.data)
//     //                 })
//     //                 .catch(function (error) {
//     //                     console.log(error)
//     //                 })
//     //         })
//     //     },
//     //
//     // },
// }


import Uppy from '@uppy/core';
const Dashboard = require('@uppy/dashboard')
const Webcam = require('@uppy/webcam')
const ImageEditor = require('@uppy/image-editor')

export default {
    mounted() {
        this.instantiateUppy()
    },
    methods:{
        instantiateUppy(){
            var uppy = new Uppy({
                debug: true,
                autoProceed: false,
                restrictions: {
                    maxFileSize: 1000000,
                    maxNumberOfFiles: 3,
                    minNumberOfFiles: 2,
                    allowedFileTypes: ['image/*', 'video/*']
                }
            })
        .use(Dashboard, {
                trigger: '.UppyModalOpenerBtn',
                inline: true,
                target: '.DashboardContainer',
                replaceTargetContent: true,
                showProgressDetails: true,
                note: 'Images and video only, 2–3 files, up to 1 MB',
                height: 400,
                metaFields: [
                    { id: 'name', name: 'Name', placeholder: 'file name' },
                    { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
                ],
                browserBackButtonClose: true
            })
                .use(ImageEditor, { target: Dashboard })
            uppy.on('complete', result => {
                console.log('successful files:', result.successful)
                console.log('failed files:', result.failed)
            })
        }
    }
}
</script>

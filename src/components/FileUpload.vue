<template>
    <div>
      <input type="file" @change="uploadFile" />
    </div>
  </template>
  
  <script>
  import { storage } from '@/firebase';
  
  export default {
    methods: {
      async uploadFile(event) {
        const file = event.target.files[0];
        const storageRef = ref(storage, 'your-upload-path/' + file.name);
  
        try {
          const snapshot = await uploadBytes(storageRef, file);
          console.log('File uploaded:', snapshot);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      },
    },
  };
  </script>
  
<template>
    <div class="importar">
        <h1>Importar arquetipo</h1>
        <div role="form">
            <form>
              <div class="form-group">
                    <label class="btn btn-info">
                        <i class="fa fa-folder-open-o" aria-hidden="true"></i>&nbsp;Seleccionar un archivo 
                        <input type="file" accept=".json" @change="onFileSelected" name="myfile">
                    </label>
                </div>
            </form>
        </div>
    </div>
</template>
<script src="~/lib/vue/vue_v2.5.16.js"></script> 
<script src="~/vue/blade-account-update-credit-card-vue.js" asp-append-version="true"></script>
<script>
    export default {
        name: "my-component",
        methods: {
            onFileSelected (event) {
               const file = event.target.files[0];
               const formData = new FormData();
               formData.append("my-file", file);
               Vue.http.post(`http://localhost:3000/api/arquetipos`, formData, {
                  headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                  }
               })
                .then(res => {
                    //todo ok
                },
                error => {
                    //todo mal :P
                })
            }
        }
    }
</script>

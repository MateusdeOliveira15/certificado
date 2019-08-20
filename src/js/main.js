// LOTE
let btn_back = document.querySelector('#btn-back')

btn_back.addEventListener('click', async ()=> {
    
    

    

      
})


let btn_add = document.querySelector('.btn-add')
let btn_edit = document.querySelectorAll('.btn-edit')
let btn_delete = document.querySelectorAll('.btn-delete')
let btn_pdf = document.querySelectorAll('.btn-pdf-lote')


btn_pdf.forEach((btn)=> {
    btn.addEventListener('click',async () => {

        let id = btn.attributes.btnPdfLote.textContent
        let form = document.querySelector("#form-pdf-lote-"+id)
        
        form.submit()
        
    })
})


btn_add.addEventListener('click',async ()=> {
    const {value: value} = await Swal.fire({
        title: 'Adicionar Lote',
        html:
            '<form id="form-lote" action="" method="POST">'+
            '<input id="swal-input1" name="nome" class="swal2-input" placeholder="Digite o nome do Lote">'+
            '<input id="swal-input1" name="titulo" class="swal2-input" placeholder="Digite o titulo">'+
            '<input id="swal-input1" name="data_realizacao" class="swal2-input" placeholder="Digite a data de realização">'+
            '<input id="swal-input1" name="carga_horaria" class="swal2-input" placeholder="Digite a carga horária">'+
            '</form>',
        showCloseButton: true,
        confirmButtonColor: '#D2AD54',
        confirmButtonText: 'Salvar',
        preConfirm: () => {
            return [
                // document.getElementById('swal-input1').value,
                document.getElementById('form-lote').submit()
            ]
        }
      })
      
    //   let el = document.querySelector('#nome_lote')
    //   let form = document.querySelector('#form')

    //   if(value){
    //     el.value = value
    //      form.submit(el)
    //   }
      
      
})


btn_edit.forEach((btn)=> {
    btn.addEventListener('click',async () => {
        let id_lote = btn.attributes.id_lote.textContent
        let nome = btn.attributes.nome.textContent
        let titulo = btn.attributes.titulo.textContent
        let data_realizacao = btn.attributes.data_realizacao.textContent
        let carga_horaria = btn.attributes.carga_horaria.textContent

        url = 'update/' + id_lote

        const {value: value} = await Swal.fire({
            title: 'Atualizar Lote',
            html:
                '<form id="form-lote" action="'+url+'" method="POST">'+
                '<input id="swal-input1" name="nome_lote" class="swal2-input" placeholder="Digite o nome do Lote" value="'+nome+'">'+
                '<input id="swal-input2" name="titulo" class="swal2-input" placeholder="Digite o titulo" value="'+titulo+'">'+
                '<input id="swal-input3" name="data_realizacao" class="swal2-input" placeholder="Digite a data de realização" value="'+data_realizacao+'">'+
                '<input id="swal-input4" name="carga_horaria" class="swal2-input" placeholder="Digite a carga horária" value="'+carga_horaria+'">'+
                '</form>',
            showCloseButton: true,
            confirmButtonColor: '#D2AD54',
            confirmButtonText: 'Atualizar',
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('form-lote').submit()  
                ] 
            }
          })
    })
})

btn_delete.forEach((btn)=>{
    aux = 0;
    btn.addEventListener('click',async ()=> {
        // let btn_el = this.btn
        console.log(btn)
        const {value: value} = await Swal.fire({
            title: 'Tem certeza?',
            text: "Nem o Mateus será capaz de reverter isso!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.value) {

                await Swal.fire(
                    'Deletado!',
                    'Seu lote foi deletado com sucesso',
                    'success'
                )

                let lote = btn.attributes.value.textContent
                
                window.location.href = "/delete/"+lote
                
            }
        })

        let el = document.querySelector('#nome_lote')
        let form = document.querySelector('#form-atualizar')

        if(value){
            el.value = value
            form.submit(el)
        }
        
    })
})


// =========================================================================== //

// ALUNOS

let btn_add_alunos = document.querySelector('.btn-add-aluno')
let btn_edit_aluno = document.querySelectorAll('.btn-edit')
let btn_delete_aluno = document.querySelectorAll('.btn-delete')

btn_add_alunos.addEventListener('click',async ()=> {
    const {value: value} = await Swal.fire({
        title: 'Adicionar Aluno',
        input: 'text',
        inputPlaceholder: 'Digite o nome do Aluno',
        confirmButtonText: 'Salvar',
        showCloseButton: true,
        confirmButtonColor: '#D2AD54',
      })

      let el = document.querySelector('#nome_aluno')
      let form = document.querySelector('#form_aluno')

      if(value){
        el.value = value
         form.submit(el)
      }
      
})


btn_edit.forEach((btn)=> {
    btn.addEventListener('click',async () => {
        let id_aluno = btn.attributes.id_aluno.textContent
        let nome = btn.attributes.nome.textContent
        

        url = 'update/aluno/' + id_aluno

        const {value: value} = await Swal.fire({
            title: 'Atualizar Lote',
            html:
                '<form id="form-lote" action="'+url+'" method="POST">'+
                '<input id="swal-input1" name="nome" class="swal2-input" placeholder="Digite o nome do Lote" value="'+nome+'">'+
                '</form>',
            showCloseButton: true,
            confirmButtonColor: '#D2AD54',
            confirmButtonText: 'Atualizar',
            preConfirm: () => {
                return [
                    
                    document.getElementById('form-lote').submit()  
                ] 
            }
          })
    })
})


btn_delete_aluno.forEach((btn)=>{
    aux = 0;
    btn.addEventListener('click',async ()=> {
        // let btn_el = this.btn
        const {value: value} = await Swal.fire({
            title: 'Tem certeza?',
            text: "Nem o Mateus será capaz de reverter isso!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.value) {

                await Swal.fire(
                    'Deletado!',
                    'Seu lote foi deletado com sucesso',
                    'success'
                )

                let lote = btn.attributes.value.textContent
                
                window.location.href = "/delete/aluno/"+lote
                
            }
        })

        let el = document.querySelector('#nome_lote')
        let form = document.querySelector('#form-atualizar')

        if(value){
            el.value = value
            form.submit(el)
        }
        
    })
})
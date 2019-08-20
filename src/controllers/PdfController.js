const PDFDocument = require('pdfkit')
const Aluno = require('../models/Alunos')
const fs = require('fs')



const fontSize = 16
const font_regular = 'Times-Roman'
const font_bold = 'Times-Bold'
const width = 841.89
const height = 595.28






module.exports = {
    async CreatePdf(req, res){
        const alunos = await Aluno.find({lote:req.body.id_lote})
        

        const pdf = new PDFDocument({
            size: 'A4',
            layout: 'landscape',
            margin: 0,
            autoFirstPage: false
        })
    
        let carga_horaria = req.body.carga

        let num =  parseInt(req.body.quantidade)
        pdf.pipe(fs.createWriteStream('./src/media/file.pdf'))
        



        for (let i = 0; i < num; i++ ) {  
            pdf.addPage()
            
            pdf.image('./src/media/img/diploma.png', {
                width: width,
                height: height,
            })

            texto = 'Certificamos que:'

            pdf.fontSize(fontSize).font(font_regular).text(texto , 0 , 220,  {
                align: 'center'
            }).moveDown(0.5)

            
            texto = alunos[i].nome

            pdf.fontSize(36).font(font_bold).text(texto, {
                align: 'center'
            })

            texto = 'Participou da palestra'

            pdf.fontSize(fontSize).font(font_regular).text(texto, {
                align: 'center'
            })

            texto = req.body.titulo
            pdf.font(font_bold).text(texto, (width / 2 - 200), 310,{
                width: 400,
                align: 'center',
                
            })

            texto = `que se realizou na Faculdade do Maciço de Baturité - FMB No período de ${req.body.realizado}, com duração de ${carga_horaria} horas.`


            pdf.font(font_regular).text(texto, {
                align: 'center',
                width: 400,
            }).moveDown(3)

            //texto = 'Baturité-CE, 20 de Julho de 2019'
            let data = new Date()
            data.toLocaleString("pt-br",{timeZone:"America/Sao_Paulo"})

            let dia = data.getDate()
            let meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
            let mes = ''
            let ano = data.getFullYear()
            if (data.getMonth()+1 == 12) {
                let mes = meses[data.getMonth() -1]
            } else if(data.getMonth()+1 == 0) {
                let mes = meses[data.getMonth() +1]
            } else {
                mes = meses[data.getMonth()]
            }
            
            texto = `Baturité-CE, ${dia} de ${mes} de ${ano}`

            pdf.text(texto, {
                align: 'center',
                width: 400
            })   
            
         }
        
        pdf.pipe(res)
        pdf.end() 
        
    }
}


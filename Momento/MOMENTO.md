# Momento 

Contém a base de indicados da empresa Momento para treinar consultas complexas no MongoDB.

Vamos fazer algumas perguntas para brincar de análise exploratória de dados com MongoDB.

* Quantos funcionarios da empresa Momento trabalham no departamento de vendas?

Resposta: db.funcionarios.count({cargo: /Vendas/i})
10 funcionarios

* Inclua suas próprias informações no departamento de Tecnologia da empresa.

Resposta:

db.funcionarios.insertOne({

  nome: 'Victor de Curtis',
  telefone: '11 930103545',
  email: 'victorzampella@gmail.com',
  dataAdmissao: '2008-01-03',
  cargo: 'Full Stack',
  salario: 10000,
  departamento: ObjectId('85992103f9b3e0b3b3c1fe74')

  })

* Agora diga, quantos funcionários temos ao total na empresa?
 
  Resposta: db.funcionarios.countDocuments()
  24 Funcionarios

* E quanto ao Departamento de Tecnologia?

Resposta:

db.funcionarios.countDocuments({departamento: ObjectId('85992103f9b3e0b3b3c1fe74')})

6 funcionários

* Qual a média salarial do departamento de tecnologia?

db.funcionarios.aggregate([  
{
$match:{departamento:ObjectId('85992103f9b3e0b3b3c1fe74')}
},  

{
$group:{
_id: null,
totalsalario:{$sum:"$salario"},
totalfuncionarios:{$sum:1}
}},
{
$project:{
_id: 0,
mediasalarial:{$divide:["$totalsalario","$totalfuncionarios"]}

}
}
])

 Quanto o departamento de Vendas gasta em salários?

db.funcionarios.aggregate([  
{
$match:{departamento:ObjectId('85992103f9b3e0b3b3c1fe71')}
},  

{
$group:{
_id: 0,
totalsalario:{$sum:"$salario"},
totalfuncionarios:{$sum:1}
}},

])


* Um novo departamento foi criado. O departamento de Inovações. 
Ele será locado no Brasil. Por favor, adicione-o no banco de dados da empresa colocando quaisquer informações que você achar relevantes.

Resposta: Departamento Criado

db.departamentos.insertOne({

  nome: 'inovacoes',
	escritorio: ObjectId()
  })
Resposta : Escritório criado




* O departamento de Inovações está sem funcionários. Inclua alguns colegas de turma nesse departamento.  

db.funcionarios.insertMany([

    { nome: 'Victor de Curtis',
  		telefone: '11 930103545',
  		email: 'victorzampella@gmail.com',
  		dataAdmissao: '2008-01-03',
  		cargo: 'Full Stack',
  		salario: 10000,
  		departamento: ObjectId('66f5650386b2d495f9b9ae7b')},

     { nome: 'Murilo Coelho',
  		 telefone: '11 999999999',
 			 email: 'murilocoelho@gmail.com.com',
			 dataAdmissao: '2008-08-09',
 			 cargo: 'Full Stack',
  		 salario: 5500,
  		 departamento: ObjectId('66f5650386b2d495f9b9ae7b')

    }])

* Quantos funcionarios a empresa Momento tem agora?

Resposta: Tem 26 Funcionarios

db.funcionarios.countDocuments()

* Quantos funcionários da empresa Momento possuem conjuges?

Resposta: Tem 7 funcionarios que possuem conjuge

db.funcionarios.countDocuments({"dependentes.conjuge":{$exists:true}})

* Qual a média salarial dos funcionários da empresa Momento, excluindo-se o CEO?

Resposta:   mediasalarial: 9607.2

db.funcionarios.aggregate([  
  {$match:{cargo:{$ne:"CEO"}}
},
{
$group:{
_id: null,
totalsalario:{$sum:"$salario"},
totalfuncionarios:{$sum:1}
}},
{
$project:{
_id: 0,
mediasalarial:{$divide:["$totalsalario","$totalfuncionarios"]}

}
}
])

* Qual a média salarial do departamento de tecnologia? 

Resposta:  mediasalarial: 5466.666666666667
db.funcionarios.aggregate([  
{
$match:{departamento:ObjectId('85992103f9b3e0b3b3c1fe74')}
},  

{
$group:{
_id: null,
totalsalario:{$sum:"$salario"},
totalfuncionarios:{$sum:1}
}},
{
$project:{
_id: 0,
mediasalarial:{$divide:["$totalsalario","$totalfuncionarios"]}

}
}
])


* Qual o departamento com a maior média salarial?

db.funcionarios.aggregate([  
{
$group:{
_id: "$departamento",
totalsalario:{$sum:"$salario"},
totalfuncionarios:{$sum:1}
}},
{
$project:{
departamento: "$_id",
_id: "$departamento",
mediasalarial:{$divide:["$totalsalario","$totalfuncionarios"]}
}
},
  {
$sort:{"mediasalarial":-1}},{$limit:1}

])

* Qual o departamento com o menor número de funcionários?

Resposta: O departamento é o excutivo o qual está o "CEO"
db.funcionarios.aggregate([  
{
$group:{
_id: "$departamento",
totalfuncionarios:{$sum:1}
}},
  {
$sort:{"totalfuncionarios":1}},{$limit:1}

])


* Pensando na relação quantidade e valor unitario, qual o produto mais valioso da empresa?

Resposta: O produto mais valioso em questao unitaria seria o sabre de luz

db.vendas.aggregate([
  {
    $sort: {quantidade: -1}
  },
  {
    $sort: {precoUnitario: -1}
  },
  {
    $limit: 1
  }
])

* Qual o produto mais vendido da empresa?
  Resposta: Oproduto mais vcendido da empresa seria o Uniforme d e moléculas instaveis
db.vendas.aggregate([
  {
    $sort: {quantidade: -1}
  },
  {
    $limit: 1
  }
])

* Qual o produto menos vendido da empresa?

Resposta: O produto mnenos vendido seria o uniforme do superman.

db.vendas.aggregate([
  {
    $sort: {quantidade: -1}
  },
  {
    $limit: 1
  }
])



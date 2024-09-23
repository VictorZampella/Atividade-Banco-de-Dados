
//1- Quantas vezes Natalie Portman foi indicada ao Oscar?

db.registros.count({nome_do_indicado: "Natalie Portman",})



//2- Quantos Oscars Natalie Portman ganhou?

db.registros.countDocuments({nome_do_indicado: "Natalie Portman", vencedor: "true"})



//3- Amy Adams já ganhou algum Oscar?

db.registros.count({nome_do_indicado:"Amy Adams",vencedor: "true"})



//4- A série de filmes Toy Story ganhou um Oscar em quais anos?

db.registros.find({nome_do_filme:/Toy Story/i,vencedor:"true"})



//5- A partir de que ano que a categoria "Actress" deixa de existir? 

db.registros.find({categoria: "ACTRESS"}).sort({cerimonia:-1})



//6- O primeiro Oscar para melhor Atriz foi para quem? Em que ano?

db.registros.find({categoria: "ACTRESS",vencedor : "true"}).sort({cerimonia:1})



//7- Na campo "Vencedor", altere todos os valores com "True" para 1 e todos os valores "False" para 0.

db.registros.updateMany({vencedor:"true"},{$set:{vencedor:"1"}})

db.registros.updateMany({vencedor:"false"},{$set:{vencedor:"0"}})



//8- Em qual edição do Oscar "Crash" concorreu ao Oscar?

db.registros.find({nome_do_filme:"Crash",vencedor:"1"})

//Resposta: Concorreu em 2006


//9- Bom... dê um Oscar para um filme que merece muito, mas não ganhou.

db.registros.updateOne({nome_do_filme:"Kung Fu Panda"},{$set:{vencedor:"1"}})

//Kung Fu Panda 



//10- O filme Central do Brasil aparece no Oscar?


db.registros.find({nome_do_filme: "Central Station"})

//Resposta: Sim ele foi indicado no ano de 1999 , mas não ganhou o Oscar




//11- Inclua no banco 3 filmes que nunca foram nem nomeados ao Oscar, mas que merecem ser. 


db.registros.insertMany([

    {  'id_registro': 20902,
    'ano_filmagem': 2011,
    'ano_cerimonia': 2012,
    'cerimonia': 78,
    'categoria': 'ACTOR',
    'nome_do_indicado': 'Ryan Reynolds',
    'nome_do_filme': 'O lanterna Verde',
    'vencedor': '1'},
  
    {  'id_registro': 20904,
    'ano_filmagem': 2004,
    'ano_cerimonia': 2005,
    'cerimonia': 79,
    'categoria': 'ACTOR',
    'nome_do_indicado': 'Marlon Wayans',
    'nome_do_filme': 'As Branqelas',
    'vencedor': '1'},
  
  {'id_registro': 20908,
    'ano_filmagem': 2006,
    'ano_cerimonia': 2007,
    'cerimonia': 82,
    'categoria': 'PROA',
    'nome_do_indicado': 'Shawn Wayans',
    'nome_do_filme': 'O pequenino',
    'vencedor': '1'},
  
  ])


//14 - Pensando no ano em que você nasceu: Qual foi o Oscar de melhor filme, Melhor Atriz e Melhor Diretor?

db.registros.find({ano_cerimonia: 2001,categoria:"DIRECTING",vencedor: "1"})

melhor diretor
//Resposta: Steven Soderbergh


db.registros.find({ano_cerimonia: 2001,categoria:"ACTRESS IN A LEADING ROLE",vencedor: "1"})
Melhor Atriz 
//Resposta: Julia Roberts


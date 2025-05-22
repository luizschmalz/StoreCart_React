import camiseta from "../../assets/camiseta.jpg";
import tenis from "../../assets/tenis.jpg";
import relogio from "../../assets/relogio.jpg";
import mochila from "../../assets/mochila.jpg";
import fone from "../../assets/airpods.jpg";
import oculos from "../../assets/oculos.jpg";
import celular from "../../assets/celular.jpg";
import cadeiragamer from "../../assets/cadeiragamer.jpg";
import caneca from "../../assets/caneca.jpg";


const products = [
  {
    id: 1,
    name: "Camiseta básica",
    description: "A Camiseta Básica é feita com 100% algodão premium, proporcionando um toque suave e confortável na pele. Ideal para o dia a dia, ela combina resistência e leveza, sendo perfeita para todas as estações. Com um corte moderno e ajuste perfeito ao corpo, é uma peça coringa no guarda-roupa de qualquer pessoa.",
    price: 49.90,
    image: camiseta
  },
  {
    id: 2,
    name: "Tênis esportivo",
    description: "O Tênis Esportivo foi desenvolvido para oferecer máximo desempenho em corridas e treinos. Com sistema de amortecimento reforçado, ele absorve o impacto a cada passo, protegendo suas articulações. Seu design moderno, aliado a materiais respiráveis, garante conforto, estabilidade e estilo em todas as atividades físicas.",
    price: 199.99,
    image: tenis
  },
  {
    id: 3,
    name: "Relógio digital",
    description: "Este Relógio Digital é o companheiro ideal para quem busca funcionalidade e estilo. Resistente à água e com diversas funções, como cronômetro, alarme e iluminação noturna, ele se adapta perfeitamente à rotina agitada. Seu visual esportivo e elegante combina com qualquer ocasião, do trabalho ao lazer.",
    price: 299.90,
    image: relogio
  },
  {
    id: 4,
    name: "Mochila de viagem",
    description: "A Mochila de Viagem oferece amplo espaço interno e diversos compartimentos para organização eficiente. Produzida com materiais resistentes à água e ao desgaste, ela é perfeita para aventuras longas ou viagens a trabalho. Seu design ergonômico, com alças acolchoadas, garante conforto mesmo em longas caminhadas.",
    price: 159.50,
    image: mochila
  },
  {
    id: 5,
    name: "Fone de ouvido Bluetooth",
    description: "O Fone de Ouvido Bluetooth oferece som de alta qualidade com graves potentes e agudos nítidos. Com tecnologia de cancelamento de ruído ativo, proporciona imersão total em músicas e chamadas. A bateria de longa duração garante horas de reprodução sem interrupções, e o design leve e moderno proporciona conforto o dia inteiro.",
    price: 249.00,
    image: fone
  },
  {
    id: 6,
    name: "Óculos de sol",
    description: "Estes Óculos de Sol aliam proteção e estilo. Com lentes que filtram 100% dos raios UV, protegem sua visão sem abrir mão do visual. O design moderno e as armações leves tornam o acessório ideal para todas as ocasiões, do passeio à praia até o uso urbano no dia a dia.",
    price: 89.99,
    image: oculos
  },
  {
    id: 7,
    name: "Smartphone",
    description: "Este Smartphone de última geração vem equipado com uma tela AMOLED vibrante e câmera tripla de alta resolução, garantindo fotos e vídeos incríveis. Seu desempenho é fluido mesmo com múltiplas tarefas, graças ao processador de alto desempenho. Ideal para quem busca tecnologia, velocidade e um design sofisticado em um só aparelho.",
    price: 1499.99,
    image: celular
  },
  {
    id: 8,
    name: "Cadeira Gamer",
    description: "A Cadeira Gamer foi projetada para oferecer máximo conforto durante longas sessões de jogos ou trabalho. Com estrutura reforçada, estofamento em espuma de alta densidade e revestimento premium, ela proporciona suporte ergonômico para costas, pescoço e braços. Ajustes de altura e inclinação garantem personalização total para sua postura.",
    price: 699.90,
    image: cadeiragamer
  },
  {
    id: 9,
    name: "Caneca personalizada",
    description: "A Caneca Personalizada é perfeita para quem ama começar o dia com uma boa dose de café. Com estampa exclusiva e acabamento de alta qualidade, ela é resistente ao micro-ondas e à lava-louças. Um item divertido, funcional e cheio de personalidade para presentear ou colecionar.",
    price: 39.90,
    image: caneca
  }
];
export default products;
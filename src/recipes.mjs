// AI-assisted editorial drafts. No kitchen-testing or review claims are made.
// Quantities and instructions are authored for this starter, not copied from a recipe site.
// Each ingredient: [quantity, metric unit, English name, Chinese name].
import {readFileSync} from 'node:fs';
import {extraRecipes} from './recipes-extra.mjs';
import {newRecipesA} from './recipes-new-a.mjs';
import {newRecipesB} from './recipes-new-b.mjs';
const imageMap=JSON.parse(readFileSync(new URL('./image-map.json',import.meta.url),'utf8'));
export const recipes = [
  {
    id:'tomato-egg', en:'Tomato & Egg Stir-fry', zh:'番茄炒蛋', pinyin:'Fān qié chǎo dàn',
    intro:['Soft eggs, juicy tomatoes, and a little sauce to spoon over rice. A comforting place to begin your Chinese cooking journey.','嫩滑鸡蛋配上多汁番茄，拌着米饭吃，就是熟悉的家常味。适合第一次尝试中餐。'],
    region:['Home-style','家常菜'], category:'everyday', minutes:15, prep:5, cook:10, servings:2, vegetarian:true, spice:0, image:'tomato-egg.jpg', difficulty:['Easy','简单'],
    allergens:['Egg','鸡蛋'],
    ingredients:[[3,'pieces','large eggs','大鸡蛋'],[400,'g','ripe tomatoes, cut into wedges','熟番茄，切块'],[2,'tbsp','neutral cooking oil','中性食用油'],[0.5,'tsp','salt, divided; adjust to taste','盐，分次使用，按口味调整'],[1,'tsp','sugar (optional)','白糖（可选）'],[2,'tbsp','water','水'],[1,'pieces','scallion, sliced','小葱，切段']],
    steps:[
      ['Beat the eggs','Whisk the eggs with half the salt. Cut the tomatoes before heating the pan so everything is ready.','打散鸡蛋','鸡蛋加一半盐打散。番茄提前切块，小葱切段。'],
      ['Scramble gently','Heat half the oil in a frying pan over medium heat. Add eggs and fold into soft curds. Transfer to a clean plate.','炒鸡蛋','平底锅中火加热，倒入一半食用油。加入蛋液，轻轻推成块，盛到干净盘子中。'],
      ['Soften the tomatoes','Add the remaining oil and tomatoes. Cook for 3–5 minutes, stirring, until they soften. Add water, remaining salt, and optional sugar.','炒番茄','加入剩余油和番茄，翻炒3至5分钟至变软。加水、剩余盐和可选的白糖。'],
      ['Bring it together','Return eggs to the pan. Fold together for 1–2 minutes until the eggs are fully cooked and the dish is piping hot. Finish with scallion and serve.','合炒出锅','鸡蛋倒回锅中，翻拌1至2分钟，至鸡蛋完全熟透、整盘菜热透。撒小葱，盛出。']
    ],
    tip:['Use ripe tomatoes for a fuller sauce. If the pan looks dry, add water a tablespoon at a time rather than extra oil.','熟番茄更容易出汁。锅中太干时，每次补一汤匙水即可。'],
    swaps:[['Scallion','A little chopped chive works as a finishing garnish.','小葱','可用少量细香葱作为出锅装饰。']],
    safety:['Cook egg dishes to 71°C / 160°F.','鸡蛋菜肴中心温度应达到71°C。']
  },
  {
    id:'kung-pao-chicken', en:'Kung Pao Chicken', zh:'宫保鸡丁', pinyin:'Gōng bǎo jī dīng',
    intro:['A home-kitchen take on the Sichuan classic: chicken, crunchy peanuts, and a tangy sauce. Make the heat your own.','适合家用厨房的做法：鸡丁、花生和酸甜酱汁相遇，辣度由你决定。'],
    region:['Sichuan-inspired','川味'], category:'sichuan', minutes:30, prep:15, cook:15, servings:2, vegetarian:false, spice:2, image:'kung-pao.jpg', difficulty:['Medium','中等'],
    allergens:['Peanut, soy, wheat (check soy sauce)','花生、大豆、小麦（检查酱油标签）'],
    ingredients:[[300,'g','boneless chicken thigh, cut into 2 cm cubes','去骨鸡腿肉，切2厘米丁'],[40,'g','roasted unsalted peanuts','熟无盐花生'],[2,'pieces','scallions, cut into short sections','小葱，切段'],[2,'pieces','garlic cloves, sliced','蒜瓣，切片'],[10,'g','fresh ginger, minced','生姜，切末'],[3,'pieces','dried chillies (optional), cut in half','干辣椒（可选），剪半'],[2,'tbsp','light soy sauce, divided','生抽，分次使用'],[1,'tbsp','Chinese black vinegar','镇江香醋'],[2,'tsp','sugar','白糖'],[2,'tsp','cornstarch, divided','玉米淀粉，分次使用'],[3,'tbsp','water','水'],[2,'tbsp','neutral oil','中性食用油']],
    steps:[
      ['Prepare chicken and sauce','Mix chicken with half the soy sauce and half the cornstarch; refrigerate for 10 minutes while preparing the aromatics. Separately mix the remaining soy sauce and cornstarch, vinegar, sugar, and water.','准备鸡肉与酱汁','鸡肉加一半生抽和一半淀粉，冷藏10分钟，同时备姜蒜葱。另碗混合剩余生抽、淀粉、醋、糖和水。'],
      ['Cook the chicken','Heat oil in a wide pan over medium-high heat. Add chicken in one layer, working in batches if needed. Turn and cook until almost done, about 5–7 minutes.','炒鸡丁','宽平底锅中大火热油，鸡丁铺成一层，必要时分批炒。翻面炒约5至7分钟，至接近熟透。'],
      ['Add the aromatics','Lower to medium heat. Add ginger, garlic, scallions, and optional chillies. Stir for about 1 minute; do not let the chillies blacken.','加入香料','调到中火，加入姜、蒜、小葱和可选辣椒。翻炒约1分钟，避免辣椒烧黑。'],
      ['Coat and finish','Stir the sauce again and pour into the pan. Simmer and toss until it thickens and chicken reaches 74°C / 165°F. Fold in peanuts and serve with rice.','收汁出锅','再次搅匀酱汁后倒入锅中，煮至变稠，翻拌裹匀。确认鸡肉中心达到74°C，再拌入花生，配米饭。']
    ],
    tip:['Have the sauce mixed before you start cooking. A wide frying pan is fine; leave space around the chicken so it cooks evenly.','开火前调好酱汁。宽平底锅也能做，鸡肉之间留空隙，避免堆叠。'],
    swaps:[['Black vinegar','Rice vinegar gives a lighter flavour; start with 2 tsp and adjust the sauce to taste.','香醋','米醋风味较清淡，可从2茶匙开始，按口味调整。'],['Peanuts','Omit them if you cannot eat peanuts. Other nuts are not automatically safe for a nut allergy.','花生','不能食用花生时直接省略；其他坚果不一定适合坚果过敏者。']],
    safety:['Chicken must reach 74°C / 165°F in its thickest pieces.','鸡肉最厚处须达到74°C。']
  },
  {
    id:'egg-fried-rice', en:'Everyday Egg Fried Rice', zh:'家常蛋炒饭', pinyin:'Dàn chǎo fàn',
    intro:['A quick pan of rice with eggs, peas, and scallions. Separate grains and a hot pan do most of the work.','米饭、鸡蛋、豌豆和小葱，炒出简单的一餐。米粒松散、锅温合适，就是关键。'],
    region:['Home-style','家常菜'], category:'everyday', minutes:20, prep:5, cook:15, servings:2, vegetarian:true, spice:0, image:'fried-rice.jpg', difficulty:['Easy','简单'],
    allergens:['Egg, soy, wheat (check soy sauce)','鸡蛋、大豆、小麦（检查酱油标签）'],
    ingredients:[[400,'g','cooked rice, safely chilled or freshly cooked with steam released','熟米饭，妥善冷藏或新煮后散掉水汽'],[2,'pieces','large eggs','大鸡蛋'],[100,'g','frozen peas, thawed','冷冻豌豆，解冻'],[2,'pieces','scallions, sliced','小葱，切碎'],[1,'tbsp','light soy sauce','生抽'],[2,'tbsp','neutral cooking oil','中性食用油'],[0.25,'tsp','white pepper (optional)','白胡椒粉（可选）']],
    steps:[
      ['Loosen the rice','Break up cold rice clumps. Freshly cooked rice can also work: spread briefly on a clean shallow tray to release steam, then use promptly. Do not leave rice out overnight. Beat eggs and prepare the vegetables.','打散米饭','冷饭结块打散。新煮饭也能用：干净浅盘短暂摊开散水汽，随后及时使用，不能室温放一夜。鸡蛋打散、蔬菜备好。'],
      ['Scramble the eggs','Heat half the oil over medium heat. Add eggs, scramble until cooked, and transfer to a clean plate.','炒鸡蛋','中火加热一半食用油，倒入蛋液，炒熟后盛到干净盘子。'],
      ['Stir-fry the rice','Add the remaining oil and rice. Increase to medium-high heat and stir for 4–6 minutes. Add peas and cook until hot throughout.','炒米饭','加入剩余油和米饭，调到中大火翻炒4至6分钟。加入豌豆，炒至全部热透。'],
      ['Season and serve','Return eggs, then add soy sauce, scallions, and optional pepper. Toss well. Reheated rice should reach 74°C / 165°F throughout. Serve immediately.','调味出锅','放回鸡蛋，加入生抽、小葱和可选白胡椒。翻炒均匀，确保复热米饭达到74°C，立即食用。']
    ],
    tip:['Over-wet grains turn fried rice mushy. Use a wide pan, break clumps first, and add soy sauce gradually. Chilled rice must have been cooled promptly and refrigerated.','米粒过湿容易炒成团，用宽锅、先打散结块，生抽逐渐加。冷饭须是及时冷却并冷藏的饭。'],
    swaps:[['Peas','Use finely diced carrot instead; cook it until tender before adding rice.','豌豆','可换成小粒胡萝卜，先炒软再加米饭。']],
    safety:['Refrigerate cooked rice within 2 hours; within 1 hour above 32°C / 90°F. Reheat to 74°C / 165°F.','熟米饭应在2小时内冷藏；环境超过32°C时应在1小时内冷藏。复热至74°C。']
  },
  {
    id:'pork-cabbage-dumplings', en:'Pork & Cabbage Dumplings', zh:'猪肉白菜饺子', pinyin:'Zhū ròu bái cài jiǎo zi',
    intro:['A weekend project with a simple filling and ready-made wrappers. Start with a half-moon fold; fancy pleats can wait.','用现成饺子皮，包一份朴实的猪肉白菜馅。先学半月形封口，再慢慢练褶子。'],
    region:['Northern-style','北方风味'], category:'northern', minutes:50, prep:35, cook:15, servings:4, vegetarian:false, spice:0, image:'dumplings.jpg', difficulty:['Medium','中等'],
    allergens:['Wheat, soy; sesame if sesame oil is used','小麦、大豆；使用芝麻油时含芝麻'],
    ingredients:[[32,'pieces','round dumpling wrappers','圆饺子皮'],[300,'g','ground pork','猪肉末'],[300,'g','napa cabbage, finely chopped','大白菜，切碎'],[0.5,'tsp','salt','盐'],[2,'pieces','scallions, minced','小葱，切末'],[10,'g','ginger, minced','生姜，切末'],[1,'tbsp','light soy sauce','生抽'],[1,'tsp','sesame oil (optional)','芝麻油（可选）'],[2,'tbsp','water for the filling','馅料用水']],
    steps:[
      ['Prepare the cabbage','Mix chopped cabbage with salt and let sit for 10 minutes. Squeeze out excess liquid in a clean towel.','处理白菜','碎白菜加盐拌匀，放10分钟。用干净布巾挤掉多余水分。'],
      ['Mix the filling','Stir pork with soy sauce, ginger, scallions, optional sesame oil, and the measured filling water. Fold in cabbage. Keep the filling refrigerated when you pause.','调馅','猪肉加生抽、姜末、葱末、可选芝麻油和配方中的馅料用水，搅拌均匀，再拌入白菜。暂停包制时，将馅料冷藏。'],
      ['Fill and seal','For a standard 9 cm wrapper, start with a scant tablespoon of filling, about 12–15 g. Use less for smaller wrappers. Moisten the edge, fold, and press firmly without trapped air.','包饺子','标准约9厘米皮先放不足1汤匙馅，约12至15克，小皮少放。边缘抹水，对折压紧，尽量排出空气。'],
      ['Boil in batches','Bring a large pot of water to a gentle boil. Add dumplings in batches and stir gently to prevent sticking. Simmer about 6–10 minutes depending on size.','分批煮制','大锅水煮开，饺子分批下锅，轻推防粘。保持温和沸腾，按大小煮约6至10分钟。'],
      ['Check the centre','Floating is not a reliable safety test. Use a thermometer to check the centre of a dumpling: ground pork must reach 71°C / 160°F. Drain and serve.','检查馅料','浮起不能单独证明熟透。用温度计测量饺子馅中心，猪肉末须达到71°C，再捞出食用。']
    ],
    tip:['Keep wrappers covered with a slightly damp clean towel while folding. Do not overfill: a firmly sealed edge matters more than elaborate pleats.','包制时用略湿的干净布巾盖住未用的皮。少放一些馅、封口紧实，比褶子好看更重要。'],
    swaps:[['Napa cabbage','Finely chopped green cabbage can work; squeeze it after salting and expect a firmer texture.','大白菜','可用切细的圆白菜，盐腌后挤水，口感会更脆实。']],
    safety:['Ground pork filling must reach 71°C / 160°F. Wash hands and utensils after handling raw meat.','猪肉馅中心须达到71°C。接触生肉后清洗手和器具。']
  },
  {
    id:'scallion-noodles', en:'Scallion Oil Noodles', zh:'葱油拌面', pinyin:'Cōng yóu bàn miàn',
    intro:['A bowl of noodles dressed in gently browned scallion oil and soy sauce. A few pantry staples, plenty of flavour.','慢慢煎香的葱油，拌上酱油和面条。食材简单，香气却很足。'],
    region:['Shanghai-style','上海风味'], category:'shanghai', minutes:25, prep:5, cook:20, servings:2, vegetarian:true, spice:0, image:'noodles.jpg', difficulty:['Easy','简单'],
    allergens:['Wheat, soy; check noodle ingredients for egg','小麦、大豆；检查面条是否含蛋'],
    ingredients:[[200,'g','dried wheat noodles (egg-free for a vegan version)','干小麦面条（纯素版选无蛋面）'],[80,'g','scallions, cut into 5 cm sections','小葱，切5厘米段'],[3,'tbsp','neutral oil','中性食用油'],[2,'tbsp','light soy sauce','生抽'],[1,'tsp','dark soy sauce (optional)','老抽（可选）'],[1,'tsp','sugar','白糖'],[2,'tbsp','noodle cooking water, reserved','留用的煮面水']],
    steps:[
      ['Dry the scallions','Wash scallions and dry thoroughly to reduce oil splatter. Cut into sections, keeping the white and green parts separate.','处理小葱','小葱洗净后充分擦干，减少油溅。切段，葱白和葱绿分开。'],
      ['Make scallion oil','Place oil and scallion whites in a pan over low-medium heat. Cook about 5 minutes, then add greens and cook 5–8 minutes until golden, not black. Remove from heat.','熬葱油','锅中放油和葱白，中小火约5分钟。再放葱绿，煎5至8分钟至金黄，不能烧黑。离火。'],
      ['Cook the noodles','Boil noodles following package instructions. Reserve some cooking water, then drain.','煮面','按包装说明煮面，捞面前留少量煮面水，然后沥干。'],
      ['Mix and toss','Combine soy sauces and sugar in a bowl. Add noodles, scallion oil, browned scallions, and the measured cooking water. Toss thoroughly and taste before adding more soy sauce.','拌面','碗中混合生抽、可选老抽和糖。加入面条、葱油、煎葱和配方中的煮面水，拌匀后尝味再调整。']
    ],
    tip:['Keep the heat moderate and watch the scallions closely near the end. Burnt scallions make the whole bowl bitter.','保持温和火力，快结束时尤其注意颜色。葱烧焦后，整碗面都会发苦。'],
    swaps:[['Dark soy sauce','Omit it if unavailable. The noodles will be lighter in colour; do not replace it with the same amount of salt.','老抽','买不到可省略，颜色会浅一些，不需要等量补盐。']],
    safety:['Serve freshly prepared. Cool and refrigerate leftovers promptly.','现做现吃，剩余食物及时冷却并冷藏。']
  },
  {
    id:'mapo-tofu', en:'Mushroom Mapo-style Tofu', zh:'菌菇麻婆豆腐', pinyin:'Má pó dòu fu',
    intro:['A meat-free variation with mushrooms, soft tofu, and a spicy bean sauce. Inspired by mapo tofu, with a gentler pantry approach.','以菌菇代替肉末的变化版本，嫩豆腐裹上辣豆瓣酱汁。保留川味灵感，适合家用厨房。'],
    region:['Sichuan-inspired','川味'], category:'sichuan', minutes:25, prep:10, cook:15, servings:2, vegetarian:true, spice:2, image:'tofu.jpg', difficulty:['Easy','简单'],
    allergens:['Soy; wheat may be present in bean paste and soy sauce','大豆；豆瓣酱和酱油可能含小麦'],
    ingredients:[[400,'g','soft tofu, cut into 2 cm cubes','嫩豆腐，切2厘米块'],[150,'g','fresh mushrooms, finely chopped','鲜菌菇，切碎'],[1,'tbsp','doubanjiang (check label for a meat-free version)','豆瓣酱（检查标签，选择无动物成分版本）'],[2,'pieces','garlic cloves, minced','蒜瓣，切末'],[10,'g','fresh ginger, minced','生姜，切末'],[200,'ml','vegetable stock or water','蔬菜高汤或水'],[1,'tsp','light soy sauce, optional','生抽（可选）'],[1,'tsp','cornstarch','玉米淀粉'],[1,'tbsp','cold water for slurry','调淀粉浆用的冷水'],[1.5,'tbsp','neutral oil','中性食用油'],[1,'pieces','scallion, sliced','小葱，切碎']],
    steps:[
      ['Prepare the tofu','Drain tofu and cut gently into cubes. Mix cornstarch with the measured slurry water in a small bowl.','准备豆腐','豆腐沥水，轻轻切块。淀粉加配方中的调浆冷水搅匀。'],
      ['Cook the mushrooms','Heat oil over medium heat. Add mushrooms and cook 4–5 minutes, until their moisture reduces.','炒菌菇','中火热油，菌菇翻炒4至5分钟，至多余水分减少。'],
      ['Build the sauce','Add garlic, ginger, and doubanjiang. Stir for 30 seconds without burning. Pour in stock and bring to a simmer. Taste before adding optional soy sauce.','煮酱汁','加入蒜、姜和豆瓣酱，炒约30秒，避免烧焦。倒入高汤，煮开，尝味后决定是否加生抽。'],
      ['Simmer gently','Slide in tofu. Simmer gently for 5–7 minutes until hot throughout, nudging the pan rather than stirring vigorously.','轻煮豆腐','放入豆腐，小火煮5至7分钟至热透。轻晃锅或慢慢推动，避免用力翻炒。'],
      ['Thicken and serve','Stir the slurry again and drizzle into the simmering sauce. Cook for 1–2 minutes until glossy. Scatter scallions and serve over rice.','勾芡出锅','再次搅匀淀粉浆，慢慢倒入微沸酱汁中。煮1至2分钟至略稠，撒葱花，配米饭。']
    ],
    tip:['Bean pastes vary in salt and heat. Begin with the stated amount, then adjust after adding stock. This version omits the traditional numbing pepper.','不同豆瓣酱咸度和辣度不同，先按配方加入，高汤煮开后再调整。本版未加入传统的麻味花椒。'],
    swaps:[['Doubanjiang','For a different, milder sauce, use 2 tsp miso plus a little chilli paste. It will not reproduce doubanjiang’s fermented broad-bean flavour.','豆瓣酱','想做较温和的不同风味，可用2茶匙味噌加少量辣椒酱，但不能还原蚕豆发酵香味。']],
    safety:['Check sauce labels for allergens and animal ingredients.','检查酱料标签中的过敏原及动物成分。']
  }
].concat(extraRecipes,newRecipesA,newRecipesB).map(r=>({
  ...r,
  type:r.type||({'tomato-egg':'vegetables','kung-pao-chicken':'meat','egg-fried-rice':'noodles','pork-cabbage-dumplings':'noodles','scallion-noodles':'noodles','mapo-tofu':'vegetables'}[r.id]),
  ...(imageMap[r.id]?{image:imageMap[r.id].file,illustration:imageMap[r.id].illustration,aiGenerated:!!imageMap[r.id].aiGenerated}:{illustration:false})
}));

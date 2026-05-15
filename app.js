const partLabels = {
  noun: "名词",
  verb: "动词",
  adjective: "形容词/副词",
  connector: "逻辑连词"
};

const optionLabels = ["A", "B", "C", "D"];
const choices = {};
const answers = new Map();
const selectedParts = new Map();
let activeQuestionId = null;
let currentArticleId = "mock-2026-sunflower-farm";

const loginCodes = [
  "A7K2M9",
  "Q4T8Z1",
  "N6P3X5",
  "R9C2L7",
  "B5V8D3",
  "Y2H6W4",
  "M8J1Q6",
  "T3F9K2",
  "Z7N4A8",
  "C1P6R5",
  "W9L3S7",
  "H4X8B2",
  "K6D1Y9",
  "P2M7V4",
  "G8Q5T1"
];

const articleLibrary = [
  {
    id: "mock-2026-sunflower-farm",
    source: "2026优质模拟题",
    title: "向日葵农场与农业旅游创业",
    status: "unfinished",
    summary: "Ursula 求职受挫后回到家乡，把家族农场发展成受欢迎的向日葵农业旅游目的地。"
  },
  {
    id: "mock-2026-05-13-homeless-cats",
    source: "2026年5月13日高考模拟",
    title: "流浪猫救助与善意传递",
    status: "unfinished",
    summary: "作者照顾社区里的五只流浪猫，为它们寻找新家，并在行动中学会为弱小者发声。"
  },
  {
    id: "practice-1-2024-national-a",
    source: "2024年全国甲卷",
    title: "奶奶的童年故事",
    status: "unfinished",
    summary: "家庭晚餐中，作者听奶奶讲述截然不同的童年经历。"
  },
  {
    id: "practice-2-2024-new-gaokao-i",
    source: "2024年新高考I卷",
    title: "运动目标与自我成长",
    status: "unfinished",
    summary: "作者从马拉松、骑行经历中重新理解目标应属于自己。"
  },
  {
    id: "practice-3-2024-new-gaokao-i",
    source: "2024年新高考Ⅱ卷",
    title: "意大利生活与家庭餐桌",
    status: "unfinished",
    summary: "作者定居意大利后，被邻里善意与家庭餐桌文化打动。"
  },
  {
    id: "practice-4-2024-beijing",
    source: "2024年北京卷",
    title: "音乐剧面试",
    status: "unfinished",
    summary: "Amy 因朋友鼓励参加音乐剧面试，并在尝试中获得成长。"
  }
];
const articleProgress = new Map(articleLibrary.map((article) => [article.id, article.status]));

const articleData = {
  "mock-2026-sunflower-farm": {
    title: "2026优质模拟题：向日葵农场与农业旅游创业",
    source: "2026优质模拟题",
    lead: "Ursula has always called the beautiful small town of Beaverton her home.",
    closing: "The farm allows visitors to leave the city, breathe fresh air, appreciate agriculture, and reconnect with their farming roots.",
    notes: [
      "人物：Ursula，一个从求职受挫转向自主创业的年轻人",
      "事件：她把家族农场的一小块土地发展成受欢迎的向日葵农业旅游项目",
      "环境：Beaverton 小镇、家族农场、10英亩到20英亩的向日葵田",
      "主旨：困境中创造机会，农业旅游让城市游客重新理解土地与农业"
    ],
    tone: "正确文章基调：由求职困难转向主动创业，最后落到事业成功和农业价值。前半部分有挫折，但整体是积极、成长、回归土地的正向叙事。",
    questions: [
      { id: 1, part: "noun", answer: "dreams", options: ["stories", "needs", "habits", "dreams"], clueType: "名词对应内容", clue: "childhood / exploring the world", clueTargets: ["childhood", "exploring-world"], logic: `空格前有 childhood，后面是 exploring the world，表示小时候对探索世界的向往。能和童年时期的“探索世界”形成直接对应的是 dreams，梦想。
stories 是故事，needs 是需求，habits 是习惯，都不能自然解释“小时候想探索世界”这种心理愿望。`, synonym: "dreams 与 childhood / desire 同场。" },
      { id: 2, part: "noun", answer: "career", options: ["career", "degree", "hobby", "project"], clueType: "名词对应内容", clue: "studied international business / finding a job", clueTargets: ["international-business", "finding-job"], logic: `空格前是 pursue a ... in Toronto，前面又说 Ursula studied international business，后面接 finding a job proved more difficult，说明她想追求的是职业发展。
career 表示事业、职业生涯，能连接“学国际商务”和“找工作”。degree 是学位，hobby 是爱好，project 是项目，都不能和 finding a job 形成最直接的对应。`, synonym: "career 与 studied / finding a job 对应。" },
      { id: 3, part: "adjective", answer: "difficult", options: ["practical", "important", "difficult", "dangerous"], clueType: "形容词描述名词性质", clue: "finding a job proved more ... than expected / create a job for myself", clueTargets: ["finding-job", "create-job"], logic: `形容词描述 finding a job 的性质。后文 Ursula 说如果没人愿意雇用她，她就给自己创造一份工作，说明找工作没有预期顺利。
因此应选 difficult，表示找工作比她想象中更困难。practical 实用的、important 重要的、dangerous 危险的，都不能解释她为什么要自己创造工作。`, synonym: "difficult 与 nobody was going to hire me 呼应。" },
      { id: 4, part: "verb", answer: "hire", options: ["invite", "notice", "hire", "cover"], clueType: "动作与名词的关系", clue: "finding a job / create a job for myself", clueTargets: ["finding-job", "create-job"], logic: `动作发出者是 nobody，动作对象是 me，前文核心事件是 finding a job。没人对求职者做的合理动作是 hire，雇用。
invite 是邀请，notice 是注意到，cover 是覆盖或报道，都不能和“找工作失败，于是自己创造工作”构成动作逻辑。`, synonym: "hire 与 finding a job / create a job 对应。" },
      { id: 5, part: "noun", answer: "idea", options: ["issue", "idea", "truth", "founder"], clueType: "名词对应内容", clue: "agriculture tourism business / came naturally / began to take root", clueTargets: ["farm-born", "agri-tourism", "take-root"], logic: `空格后是 of an agriculture tourism business，表示“农业旅游生意的……”。结合她出生并长在大家族农场，这个创业想法自然产生，所以选 idea。
issue 是问题或议题，truth 是真相，founder 是创始人，都不能和 came naturally to her 以及后面的 began to take root 构成合理关系。`, synonym: "idea 与 came naturally / plan 同场。" },
      { id: 6, part: "verb", answer: "take root", options: ["gain ground", "take root", "work wonders", "raise concerns"], clueType: "动词短语与语境比喻", clue: "farm / agriculture tourism business / idea", clueTargets: ["farm-born", "agri-tourism", "take-root"], logic: `主语是农业旅游创业 idea。她出生在农场，所以这个想法自然出现，并开始在心里扎根、成形。take root 本义是植物扎根，也可比喻想法开始形成并稳固。
gain ground 表示观点或活动逐渐流行，work wonders 表示产生奇效，raise concerns 表示引发担忧。此处还在创业想法刚出现的阶段，take root 最贴合农业语境和动作阶段。`, synonym: "take root 与 farm / agriculture 语境形成双关。" },
      { id: 7, part: "verb", answer: "proposed", options: ["proposed", "adapted", "preferred", "proved"], clueType: "动作与名词的关系", clue: "the plan / to my family / asked if they could rent me", clueTargets: ["plan-family", "asked-rent"], logic: `动作对象是 the plan，动作方向是 to my family，后面又说她 asked if they could rent me a small 10 acres。她是在把计划提给家人并请求租地。
propose the plan to sb. 表示向某人提出计划。adapted 是改编或适应，preferred 是更喜欢，proved 是证明，都不能和“向家人说计划并请求支持”形成合理动作。`, synonym: "proposed 与 plan / asked 构成动作链。" },
      { id: 8, part: "verb", answer: "refused", options: ["apologized", "refused", "panicked", "regretted"], clueType: "动作逻辑顺序", clue: "at first / unwilling to take a risk / finally managed", clueTargets: ["unwilling-risk", "finally-managed"], logic: `at first 和 but I finally 构成前后转折。家人起初 unwilling to take a risk，不愿承担风险，说明他们一开始拒绝了 Ursula 的请求。
apologized 是道歉，panicked 是惊慌，regretted 是后悔，都不能直接对应“不愿冒险”和“后来终于得到许可”。`, synonym: "refused 与 unwilling to take a risk 对应。" },
      { id: 9, part: "verb", answer: "managed", options: ["pretended", "returned", "promised", "managed"], clueType: "动作结果", clue: "finally / get the green light", clueTargets: ["finally-managed", "green-light"], logic: `空格后是 to get the green light，表示获得许可。前文说家人起初拒绝，but I finally 表示经过努力后终于成功，所以选 managed，manage to do sth. 表示设法做成某事。
pretended 是假装，returned 是返回，promised 是承诺，都不能表达“最终成功获得许可”这个结果。`, synonym: "managed 与 finally / get the green light 对应。" },
      { id: 10, part: "connector", answer: "Admittedly", options: ["Supposedly", "Admittedly", "Similarly", "Consequently"], clueType: "副词体现让步转折", clue: "little confidence in the beginning / but rose to fame", clueTargets: ["little-confidence", "rose-fame"], logic: `空格所在句先承认 I had little confidence in the beginning，后面 but the Sunflower Farm rose to fame 转向成功。这里需要一个表示“诚然、不可否认”的副词，引出对过去不足的承认。
Admittedly 正合适。Supposedly 表示据说、按理说，Similarly 表示同样地，Consequently 表示因此，都不能自然引出“我承认一开始没有信心”。`, synonym: "Admittedly 与 but 构成先承认后转折。" },
      { id: 11, part: "noun", answer: "destinations", options: ["occupations", "solutions", "institutions", "destinations"], clueType: "名词对应内容", clue: "Sunflower Farm / visitors / sought-after", clueTargets: ["sunflower-farm", "visitors"], logic: `空格描述 Sunflower Farm 成为什么。前文说农场 rose to fame，后文继续说 many visitors 来到这里，所以它成为省内最受欢迎的 destinations，旅游目的地。
occupations 是职业，solutions 是解决方案，institutions 是机构，都不能描述游客前往的向日葵农场。`, synonym: "destinations 与 visitors / tourism business 对应。" },
      { id: 12, part: "connector", answer: "let alone", options: ["let alone", "except for", "such as", "regardless of"], clueType: "逻辑递进", clue: "never been to a farm at all / a sunflower farm", clueTargets: ["never-farm", "sunflower-farm"], logic: `前半句说许多游客从未去过任何农场，后面接 a sunflower farm，这是更具体、更特殊的农场。这里需要表达“更不用说向日葵农场了”，所以选 let alone。
except for 表示除……之外，such as 表示例如，regardless of 表示不管、无论，都不能体现从“一般农场”到“向日葵农场”的递进。`, synonym: "let alone 表示递进：连普通农场都没去过，更不用说向日葵农场。" },
      { id: 13, part: "verb", answer: "leave", options: ["miss", "leave", "seize", "tour"], clueType: "动作逻辑顺序", clue: "the city for a while / breathe in the fresh air", clueTargets: ["leave-city", "fresh-air"], logic: `动作对象是 the city，后面是 for a while 和 breathe in the fresh air。游客来到农场，暂时离开城市，呼吸新鲜空气，所以选 leave。
miss 是想念或错过，seize 是抓住，tour 是游览。如果选 tour the city，就和来到农场、呼吸新鲜空气的场景不一致。`, synonym: "leave 与 city / fresh air 构成场景转换。" },
      { id: 14, part: "noun", answer: "appreciation", options: ["demand", "support", "appreciation", "excuse"], clueType: "名词对应主题", clue: "agriculture / farming roots / taken for granted", clueTargets: ["agriculture", "farming-roots"], logic: `空格前是 gain a newfound ... for agriculture，表示通过参观农场获得对农业的新认识。结合后面的 farming roots 和 taken for granted，游客会重新意识到农业价值，因此选 appreciation，欣赏、理解、感激。
demand 是需求，support 是支持，excuse 是借口，都不能准确表达“对农业产生新的认识和珍视”。`, synonym: "appreciation 与 agriculture / taken for granted 对应。" },
      { id: 15, part: "verb", answer: "connect", options: ["deal", "part", "compete", "connect"], clueType: "动词短语搭配", clue: "with their farming roots", clueTargets: ["farming-roots"], logic: `空格后是 with their farming roots。最自然的动词短语是 connect with，表示与自己的农业根源重新建立联系。
deal with 是处理，part with 是放弃或割舍，compete with 是与……竞争，都不能和 farming roots 表达“回到根源、重新连接”的文章主旨。`, synonym: "connect with 与 roots 是固定语义搭配。" }
    ],
    sentenceData: [
      { en: `Ursula has always called the beautiful small town of Beaverton her home.`, zh: "Ursula 一直把美丽的 Beaverton 小镇称作自己的家。", html: `Ursula has always called the beautiful small town of Beaverton her home.` },
      { en: `Although she'd had childhood dreams of exploring the world and studied international business with a desire to pursue a career in Toronto, finding a job proved more difficult than she'd expected.`, zh: "虽然她小时候梦想探索世界，也学习了国际商务，希望在多伦多追求一份事业，但找工作比她预想的更加困难。", html: `Although she'd had <span data-clue="childhood">childhood</span> <button class="blank-token" data-qid="1">1</button> of <span data-clue="exploring-world">exploring the world</span> and studied <span data-clue="international-business">international business</span> with a desire to pursue a <button class="blank-token" data-qid="2">2</button> in Toronto, <span data-clue="finding-job">finding a job</span> proved more <button class="blank-token" data-qid="3">3</button> than she'd expected.` },
      { en: `I decided that if nobody was going to hire me, I would just create a job for myself, says Ursula.`, zh: "Ursula 说：“我决定，如果没有人愿意雇用我，那我就自己创造一份工作。”", html: `I decided that if nobody was going to <button class="blank-token" data-qid="4">4</button> me, I would just <span data-clue="create-job">create a job for myself</span>, says Ursula.` },
      { en: `She was born and raised on a large family farm, so the idea of an agriculture tourism business came naturally to her and began to take root.`, zh: "她出生并成长在一个大家族农场，所以农业旅游生意的想法自然产生，并开始扎根成形。", html: `She was <span data-clue="farm-born">born and raised on a large family farm</span>, so the <button class="blank-token" data-qid="5">5</button> of an <span data-clue="agri-tourism">agriculture tourism business</span> came naturally to her and began to <span data-clue="take-root"><button class="blank-token" data-qid="6">6</button></span>.` },
      { en: `I proposed the plan to my family, and asked if they could rent me a small 10 acres.`, zh: "她说：“我向家人提出了这个计划，并询问他们是否可以租给我一小块10英亩的土地。”", html: `I <button class="blank-token" data-qid="7">7</button> <span data-clue="plan-family">the plan to my family</span>, and <span data-clue="asked-rent">asked if they could rent me a small 10 acres</span>.` },
      { en: `They refused at first, unwilling to take a risk, but I finally managed to get the green light, she says.`, zh: "她说：“他们一开始拒绝了，不愿冒险，但我最终设法获得了许可。”", html: `They <button class="blank-token" data-qid="8">8</button> at first, <span data-clue="unwilling-risk">unwilling to take a risk</span>, but I <span data-clue="finally-managed">finally</span> <button class="blank-token" data-qid="9">9</button> to get the <span data-clue="green-light">green light</span>, she says.` },
      { en: `Four years later, those beautiful 10 acres of fields had turned into 20 acres filled with over 400,000 sunflowers.`, zh: "四年后，那片美丽的10英亩田地已经变成了20英亩、种满40多万株向日葵的农场。", html: `Four years later, those beautiful 10 acres of fields had turned into 20 acres filled with over 400,000 sunflowers.` },
      { en: `Admittedly, I had little confidence in the beginning, says Ursula, but the Sunflower Farm rose to fame and has become one of the most sought-after destinations in the province.`, zh: "Ursula 说：“诚然，一开始我没有多少信心，但向日葵农场声名鹊起，已经成为省内最受欢迎的目的地之一。”", html: `<button class="blank-token" data-qid="10">10</button>, I had <span data-clue="little-confidence">little confidence in the beginning</span>, says Ursula, but the <span data-clue="sunflower-farm">Sunflower Farm</span> <span data-clue="rose-fame">rose to fame</span> and has become one of the most sought-after <button class="blank-token" data-qid="11">11</button> in the province.` },
      { en: `While many visitors have never been to a farm at all, let alone a sunflower farm, the unique setting allows them to leave the city for a while, breathe in the fresh air, gain a newfound appreciation for agriculture, and maybe even connect with their farming roots and what they may have taken for granted for too long.`, zh: "虽然许多游客从未去过任何农场，更不用说向日葵农场了，但这种独特的环境让他们可以暂时离开城市，呼吸新鲜空气，重新欣赏农业，甚至也许能与自己的农业根源重新建立联系，并重新看见那些被他们长期视为理所当然的东西。", html: `While many <span data-clue="visitors">visitors</span> have <span data-clue="never-farm">never been to a farm at all</span>, <button class="blank-token" data-qid="12">12</button> a sunflower farm, the unique setting allows them to <span data-clue="leave-city"><button class="blank-token" data-qid="13">13</button> the city for a while</span>, breathe in the <span data-clue="fresh-air">fresh air</span>, gain a newfound <button class="blank-token" data-qid="14">14</button> for <span data-clue="agriculture">agriculture</span>, and maybe even <button class="blank-token" data-qid="15">15</button> with their <span data-clue="farming-roots">farming roots</span> and what they may have taken for granted for too long.` }
    ],
    glossary: { Ursula: "厄休拉", Beaverton: "比弗顿", childhood: "童年", exploring: "探索", international: "国际的", business: "商务；生意", desire: "愿望", pursue: "追求", career: "职业；事业", Toronto: "多伦多", proved: "证明是；结果是", difficult: "困难的", hire: "雇用", create: "创造", raised: "养育；成长", farm: "农场", agriculture: "农业", tourism: "旅游业", naturally: "自然地", "take root": "扎根；形成", proposed: "提出", plan: "计划", rent: "租用", acre: "英亩", refused: "拒绝", unwilling: "不愿意的", risk: "风险", managed: "设法做成", "green light": "许可", sunflowers: "向日葵", admittedly: "诚然", confidence: "信心", "rose to fame": "声名鹊起", "sought-after": "受欢迎的", destination: "目的地", province: "省", visitors: "游客", "let alone": "更不用说", unique: "独特的", setting: "环境", breathe: "呼吸", appreciation: "欣赏；感激", roots: "根源", "taken for granted": "视为理所当然", connect: "连接" }
  },
  "mock-2026-05-13-homeless-cats": {
    title: "2026年5月13日高考模拟：流浪猫救助与善意传递",
    source: "2026年5月13日高考模拟",
    lead: "Last year, five homeless cats lived in the shadows in our neighborhood, silently asking for help.",
    closing: "Whether it's feeding a stray, advocating for animal welfare, or merely spreading kindness in our communities, every effort counts.",
    notes: [
      "人物：I、five homeless cats、one neighbor、friends、Joy",
      "事件：作者发现并喂养流浪猫，保护它们免被赶走，为它们寻找领养家庭",
      "环境：社区阴影处、冬天临近、潮湿地下室、社交媒体和新家庭",
      "主旨：救助流浪动物，从同情走向行动，并把善意扩展到社区"
    ],
    tone: "正确文章基调：悲悯开篇，行动推进，正能量收束。首句用 homeless cats、in the shadows、silently asking for help 定下“流浪动物需要救助”的主题。后文从喂养、安置、争取保护、寻找领养，到结尾 spreading kindness，形成由同情到行动、由个人救助到社区善意的升华。",
    questions: [
      { id: 1, part: "noun", answer: "fear", options: ["joy", "fear", "curiosity", "anger"], clueType: "名词情感对应", clue: "homeless cats / in the shadows / hope / cautiously", clueTargets: ["actor-cats-1", "homeless-shadows", "hope"], logic: `空格处和 hope 并列，描述流浪猫眼神中的情感。前文说它们 homeless、lived in the shadows，说明处境弱小、缺乏安全感；后文第2空又写它们起初 cautiously 出现，反向印证它们对人类既期待帮助，又本能害怕。
因此 hope 后最合理的是 fear。joy 喜悦、curiosity 好奇、anger 愤怒都不能同时承接“阴影中的流浪猫”和后文“小心翼翼靠近”的状态。`, synonym: "fear 与 in the shadows / cautiously 构成心理状态对应。" },
      { id: 2, part: "connector", answer: "cautiously", options: ["quietly", "aimlessly", "bravely", "cautiously"], clueType: "副词描述动作状态", clue: "appeared at first / then rushing", clueTargets: ["actor-cats-2", "appeared", "rushing"], logic: `副词修饰 appeared，关键看 at first 和 then rushing 的对比。后面说它们随后 rushing toward meats，动作非常急切；那么刚出现时的状态应与“冲过来”形成反差。
结合第1空的 fear，流浪猫起初应是 cautiously，小心翼翼地出现。quietly 只强调声音小，aimlessly 表示无目的，bravely 表示勇敢，都不能和 then rushing 形成最准确的动作对比。`, synonym: "cautiously 与 fear / then rushing 构成先谨慎后急切的动作链。" },
      { id: 3, part: "noun", answer: "concern", options: ["concern", "depression", "excitement", "expectation"], clueType: "名词概括情感", clue: "winter approached / couldn't bear / suffering", clueTargets: ["actor-my-concern", "winter", "couldnt-bear", "suffering"], logic: `空格描述 As winter approached 时作者增长的心理状态。后句直接解释：I couldn't bear the thought of those creatures suffering in the biting cold。看到它们可能在严寒中受苦，作者增长的是担忧和关切。
concern 最贴合这种“担心它们受苦”的情感。depression 程度过重，excitement 是兴奋，expectation 是期待，都无法解释 couldn't bear the thought of suffering。`, synonym: "concern 与 couldn't bear / suffering 构成情感因果。" },
      { id: 4, part: "adjective", answer: "innocent", options: ["smelly", "energetic", "innocent", "noisy"], clueType: "形容词褒贬与名词性质", clue: "creatures suffering / compassion", clueTargets: ["actor-creatures", "suffering", "compassion"], logic: `形容词修饰 creatures，要和作者对猫的态度保持一致。作者喂猫、担心它们过冬，后文还出现 compassion，说明作者看待这些猫的态度是同情和保护。
因此应选 innocent，无辜的生命在严寒中受苦。smelly 和 noisy 带贬义，与作者态度冲突；energetic 表示精力充沛，和 suffering in the biting cold 不符。`, synonym: "innocent 与 compassion / suffering 构成同情语境。" },
      { id: 5, part: "verb", answer: "removed", options: ["fed", "removed", "examined", "cleaned"], clueType: "动词同义复现", clue: "getting rid of the cats / Animal Control", clueTargets: ["actor-neighbor", "getting-rid", "animal-control"], logic: `动词题先看前一句提示。One neighbor insisted on getting rid of the cats，邻居的目标是把猫赶走。紧接着 He called Animal Control to have them ...，打电话给动物管制部门正是为了让猫被移走。
removed 是 getting rid of 的同义复现。fed 喂养与邻居态度相反，examined 检查、cleaned 清洁都不是 getting rid of 的目的。`, synonym: "removed 与 getting rid of 构成同义动作复现。" },
      { id: 6, part: "verb", answer: "reached out to", options: ["reached out to", "looked up to", "caught up with", "got on with"], clueType: "动词短语与并列动作", clue: "find loving homes / friends / posted on social media", clueTargets: ["actor-i-reached", "find-homes", "friends", "social-media"], logic: `本题看目的和并列动作。作者想 find loving homes for the cats，于是做了两件事：一是 ... friends，二是 posted on social media。能和“在社交媒体发帖求助”并列的动作，是联系朋友、向朋友求助。
reached out to 表示联系、寻求帮助，符合目的。looked up to 是敬仰，caught up with 是赶上或叙旧，got on with 是相处或继续做，都不能和 posted on social media 一起服务于“找领养家庭”。`, synonym: "reached out to 与 posted on social media 构成求助行动并列。" },
      { id: 7, part: "noun", answer: "adoption", options: ["devotion", "decision", "admission", "adoption"], clueType: "名词对应事件", clue: "found new families", clueTargets: ["actor-four-cats", "new-families"], logic: `名词题回到最近事件。前一句 To my delight, four of them found new families，说四只猫找到了新家庭。流浪动物找到新家庭，在英语语境中对应 adoption，收养。
devotion 是奉献，decision 是决定，admission 是准入或承认，都不能概括“猫找到新家庭”这一事件。每一次 adoption 都像一次胜利，正好承接作者救助任务的推进。`, synonym: "adoption 与 found new families 构成事件替换。" },
      { id: 8, part: "verb", answer: "belonged", options: ["slept", "hidden", "belonged", "waited"], clueType: "动词描述归属状态", clue: "took him in / stole my heart / brought laughter and peace", clueTargets: ["actor-joy", "took-him-in", "stole-heart", "laughter-peace"], logic: `空格描述 Joy 进入作者家后的状态。前文说 Joy stole my heart completely，后文又说它带来 laughter 和 peace，说明它与这个家高度契合，像本来就属于这里。
belonged in my home 表示归属于这个家，最符合情感和状态。slept 只写睡觉，hidden 与温暖接纳相反，waited 表示等待，都不能概括 Joy 融入家庭的感觉。`, synonym: "belonged 与 took him in / brought laughter and peace 构成归属感。" },
      { id: 9, part: "noun", answer: "strength", options: ["strength", "truth", "comfort", "secret"], clueType: "名词与动作搭配", clue: "in my voice / advocate for the voiceless", clueTargets: ["actor-i-voice", "voice", "advocate"], logic: `空格在 found ... in my voice 中，后面解释为 learning to advocate for the voiceless。advocate 是为弱者发声、维护权益，需要坚定和力量。
前文作者和邻居 heated debates，又坚持保护猫并找到领养家庭，因此她在自己的声音中找到的是 strength。truth 真相、comfort 安慰、secret 秘密都不能支撑 advocate for the voiceless 这个动作。`, synonym: "strength 与 advocate / heated debates 构成发声力量。" },
      { id: 10, part: "verb", answer: "spreading", options: ["repaying", "spreading", "receiving", "teaching"], clueType: "动词与主题升华", clue: "kindness / every effort counts", clueTargets: ["actor-actions", "kindness", "every-effort"], logic: `结尾列举积极行为：feeding a stray、advocating for animal welfare，以及 ... kindness in our communities。这里是主题升华，强调每个人都能通过小行动让世界更好。
与 kindness 最自然的搭配是 spreading kindness，传播善意。repaying kindness 是回报善意，receiving kindness 是接受善意，teaching kindness 是教导善意，都不如 spreading 能概括向社区扩散善意的主题。`, synonym: "spreading kindness 与 make the world a better place / every effort counts 呼应。" }
    ],
    sentenceData: [
      { en: `Last year, five homeless cats lived in the shadows in our neighborhood, silently asking for help.`, zh: "去年，五只流浪猫生活在我们社区的阴影中，无声地寻求帮助。", html: `Last year, <span data-clue="actor-cats-1">five homeless cats</span> <span data-clue="homeless-shadows">lived in the shadows</span> in our neighborhood, silently asking for help.` },
      { en: `Every day, I saw them huddled together, their fur matted and eyes filled with hope and fear.`, zh: "每天，我看见它们蜷缩在一起，毛发打结，眼里充满希望和恐惧。", html: `Every day, I saw them huddled together, their fur matted and eyes filled with <span data-clue="hope">hope</span> and <button class="blank-token" data-qid="1">1</button>.` },
      { en: `As I watched them, I couldn't shake the feeling that I needed to take action.`, zh: "看着它们时，我无法摆脱一种感觉：我必须采取行动。", html: `As I watched them, I couldn't shake the feeling that I needed to take action.` },
      { en: `Every morning, I put cat food near our building.`, zh: "每天早晨，我都会把猫粮放在楼附近。", html: `Every morning, I put cat food near our building.` },
      { en: `The cats appeared, cautiously at first, then rushing toward meats if they had been waiting all along.`, zh: "猫起初小心翼翼地出现，随后冲向肉食，好像它们一直在等待。", html: `<span data-clue="actor-cats-2">The cats</span> <span data-clue="appeared">appeared</span>, <button class="blank-token" data-qid="2">2</button> at first, then <span data-clue="rushing">rushing toward meats</span> if they had been waiting all along.` },
      { en: `Feeding them became a ritual that strengthened our bond.`, zh: "喂它们成了一种惯例，也加深了我们之间的联系。", html: `Feeding them became a ritual that strengthened our bond.` },
      { en: `As winter approached, my concern grew.`, zh: "随着冬天临近，我的担忧增加了。", html: `As <span data-clue="winter">winter approached</span>, <span data-clue="actor-my-concern">my</span> <button class="blank-token" data-qid="3">3</button> grew.` },
      { en: `I couldn't bear the thought of those innocent creatures suffering in the biting cold.`, zh: "我无法忍受想到那些无辜的小生命在刺骨寒冷中受苦。", html: `I <span data-clue="couldnt-bear">couldn't bear</span> the thought of those <button class="blank-token" data-qid="4">4</button> <span data-clue="actor-creatures">creatures</span> <span data-clue="suffering">suffering in the biting cold</span>.` },
      { en: `I then set up cozy corners for them in the damp basement of our building.`, zh: "于是我在楼里潮湿的地下室为它们布置了舒适的角落。", html: `I then set up cozy corners for them in the damp basement of our building.` },
      { en: `However, not everyone shared my compassion.`, zh: "然而，并不是每个人都认同我的同情心。", html: `However, not everyone shared my <span data-clue="compassion">compassion</span>.` },
      { en: `One neighbor insisted on getting rid of the cats.`, zh: "一位邻居坚持要赶走这些猫。", html: `<span data-clue="actor-neighbor">One neighbor</span> insisted on <span data-clue="getting-rid">getting rid of the cats</span>.` },
      { en: `He called Animal Control to have them removed.`, zh: "他打电话给动物管制部门，要让它们被移走。", html: `He called <span data-clue="animal-control">Animal Control</span> to have them <button class="blank-token" data-qid="5">5</button>.` },
      { en: `Our debates were heated, but I advocated for them as I knew they had no one else to defend them.`, zh: "我们的争论很激烈，但我为它们据理力争，因为我知道没有别人替它们辩护。", html: `Our debates were heated, but I advocated for them as I knew they had no one else to defend them.` },
      { en: `As weeks passed, I felt an urge to find loving homes for the cats.`, zh: "几周过去后，我产生了为这些猫寻找有爱家庭的强烈愿望。", html: `As weeks passed, I felt an urge to <span data-clue="find-homes">find loving homes</span> for the cats.` },
      { en: `I reached out to friends and posted on social media.`, zh: "我联系朋友，并在社交媒体上发帖。", html: `<span data-clue="actor-i-reached">I</span> <button class="blank-token" data-qid="6">6</button> <span data-clue="friends">friends</span> and posted on <span data-clue="social-media">social media</span>.` },
      { en: `To my delight, four of them found new families.`, zh: "令我高兴的是，其中四只找到了新家庭。", html: `To my delight, <span data-clue="actor-four-cats">four of them</span> <span data-clue="new-families">found new families</span>.` },
      { en: `Each adoption felt like a victory in my mission to make a difference.`, zh: "每一次收养都像是我改变现状使命中的一次胜利。", html: `Each <button class="blank-token" data-qid="7">7</button> felt like a victory in my mission to make a difference.` },
      { en: `Then there was one cat, Joy, who stole my heart completely.`, zh: "然后还有一只猫 Joy，它彻底偷走了我的心。", html: `Then there was one cat, <span data-clue="actor-joy">Joy</span>, who <span data-clue="stole-heart">stole my heart completely</span>.` },
      { en: `When I took him in, it was as if he had always belonged in my home.`, zh: "当我收留它时，就好像它一直属于我的家。", html: `When I <span data-clue="took-him-in">took him in</span>, it was as if he had always <button class="blank-token" data-qid="8">8</button> in my home.` },
      { en: `His playful and silly behaviour brought laughter to my days, and his gentle purring at night brought me peace.`, zh: "它顽皮又傻乎乎的举动给我的日子带来笑声，夜里温柔的呼噜声也带给我安宁。", html: `His playful and silly behaviour brought <span data-clue="laughter-peace">laughter</span> to my days, and his gentle purring at night brought me <span data-clue="laughter-peace">peace</span>.` },
      { en: `Through this experience, I've found strength in my voice, learning to advocate for the voiceless.`, zh: "通过这次经历，我在自己的声音中找到了力量，学会了为无声者发声。", html: `Through this experience, <span data-clue="actor-i-voice">I've</span> found <button class="blank-token" data-qid="9">9</button> in my <span data-clue="voice">voice</span>, learning to <span data-clue="advocate">advocate for the voiceless</span>.` },
      { en: `I've learned we all have the power to make the world a better place for all beings, no matter how small our actions may seem.`, zh: "我明白了，我们都有力量让世界对所有生命变得更好，无论我们的行动看起来多么微小。", html: `I've learned we all have the power to make the world a better place for all beings, no matter how small our actions may seem.` },
      { en: `Whether it's feeding a stray, advocating for animal welfare, or merely spreading kindness in our communities, every effort counts.`, zh: "无论是喂养流浪动物、倡导动物福利，还是仅仅在社区中传播善意，每一份努力都算数。", html: `Whether it's <span data-clue="actor-actions">feeding a stray</span>, advocating for animal welfare, or merely <button class="blank-token" data-qid="10">10</button> <span data-clue="kindness">kindness</span> in our communities, <span data-clue="every-effort">every effort counts</span>.` }
    ],
    glossary: {
      homeless: "无家可归的",
      shadows: "阴影",
      neighborhood: "社区",
      silently: "无声地",
      huddled: "蜷缩在一起",
      matted: "打结的",
      hope: "希望",
      fear: "恐惧",
      curiosity: "好奇",
      anger: "愤怒",
      cautiously: "小心翼翼地",
      rushing: "冲向",
      ritual: "惯例；仪式",
      bond: "联系；纽带",
      concern: "担忧；关切",
      depression: "抑郁",
      excitement: "兴奋",
      expectation: "期待",
      innocent: "无辜的",
      smelly: "发臭的",
      energetic: "精力充沛的",
      noisy: "吵闹的",
      compassion: "同情心",
      removed: "移走",
      examined: "检查",
      cleaned: "清洁",
      "reached out to": "联系；寻求帮助",
      "looked up to": "敬仰",
      "caught up with": "赶上；叙旧",
      "got on with": "相处；继续做",
      adoption: "收养",
      devotion: "奉献",
      decision: "决定",
      admission: "准入；承认",
      belonged: "属于",
      hidden: "隐藏",
      waited: "等待",
      strength: "力量",
      truth: "真相",
      comfort: "安慰",
      secret: "秘密",
      advocate: "倡导；维护",
      voiceless: "无声者；无法发声者",
      welfare: "福利",
      spreading: "传播",
      repaying: "回报",
      receiving: "接受",
      teaching: "教导",
      kindness: "善意",
      communities: "社区",
      counts: "有价值；算数"
    }
  },
  "practice-1-2024-national-a": {
    title: "2024年全国甲卷｜奶奶的童年故事",
    source: "2024年全国甲卷",
    lead: "One day, we had a family dinner.",
    closing: "Her stories always make my history textbooks come alive.",
    notes: ["人物：I、grandmother、family adults", "事件：家庭晚餐后帮奶奶洗碗并听故事", "环境：家庭聚餐场景，室内外形成对比", "主旨：通过奶奶的童年故事理解历史与代际差异"],
    tone: "正确文章基调：温暖、感恩、带有回忆色彩。首句从家庭晚餐切入，收尾句落到奶奶的故事让历史课本变得生动，说明文章主旨是通过代际讲述理解过去，并珍惜自己拥有的教育与生活条件。",
    questions: [
      { id: 41, part: "noun", answer: "kitchen", options: ["sitting room", "kitchen", "yard", "dining hall"], clueType: "名词对应内容", clue: "wash dishes / adults outside", clueTargets: ["actor-adults", "actor-i-left", "wash-dishes", "outside"], logic: `四个选项都是具体地点，先找文章中的地点提示。前文是 family dinner，while 把 adults 和 I 形成对比：成年人 outside，我则被留下来帮奶奶洗碗，位置应在 inside，因此可先排除 yard。
再看和“我”有关的动作：help my grandmother wash dishes。洗碗最直接对应 kitchen。sitting room 起居室和 dining hall 餐厅都不是洗碗的合理地点，所以答案选 B。`, synonym: "kitchen 与 wash dishes 构成地点动作对应。" },
      { id: 42, part: "connector", answer: "As always", options: ["As always", "By the way", "For example", "Here and now"], clueType: "副词短语描述状态", clue: "would tell me stories", clueTargets: ["actor-grandmother-42", "would-tell"], logic: `本题考副词短语的作用。句中的 would tell me stories 表示过去经常发生的动作，说明奶奶讲童年故事不是一次偶然事件，而是惯常场景。
As always 表示“和往常一样”，正好对应这种反复发生的动作状态。By the way 用于转换话题或补充说明，For example 用于举例，Here and now 强调此时此刻，这三个都不能描述“经常如此”的状态。`, synonym: "As always 与 would 的习惯性动作呼应。" },
      { id: 43, part: "verb", answer: "experienced", options: ["adjusted", "promoted", "achieved", "experienced"], clueType: "动作与名词的关系", clue: "an entirely different childhood lifestyle", clueTargets: ["actor-grandmother-43", "different-childhood"], logic: `先看动作发出者和对象。动作发出者是 my grandmother，动作对象是 an entirely different childhood lifestyle。人与童年生活方式之间最自然的关系是“经历”，所以选 experienced。
adjusted 表示调整、改变，但奶奶是在讲述过去，不可能改变自己的童年生活方式。promoted 表示促进、推广，achieved 表示实现目标或取得成就，都不能和 childhood lifestyle 形成合理动作关系。`, synonym: "experienced 与 childhood lifestyle 构成经历关系。" },
      { id: 44, part: "noun", answer: "school", options: ["work", "school", "court", "press"], clueType: "名词对应内容", clue: "Chinese lessons / family tutor / read and write", clueTargets: ["actor-she-school", "chinese-lessons", "family-tutor", "read-write"], logic: `前面说奶奶的童年生活方式和“我”的完全不同，后面要具体说明不同在哪里。对一个女孩的童年来说，have a chance to go to ... 最自然对应 school，表示没有机会上学。
work、court、press 都和女孩童年的核心处境没有直接关系。下文出现 Chinese lessons、family tutor、read and write，也都在持续复现“学习/教育”线索，进一步确认答案是 school。`, synonym: "school 与 lessons / tutor / read and write 同场复现。" },
      { id: 45, part: "verb", answer: "favored", options: ["favored", "tolerated", "trusted", "acknowledged"], clueType: "时代背景与对比", clue: "boys ... much more than girls / had to stay at home", clueTargets: ["actor-boys", "actor-grandma-stay", "boys-girls", "stay-home"], logic: `这句话同时有45、46两空，可以先看整体逻辑：boys 与 girls 对比，后文结果是 my grandma had to stay at home to do housework，说明那个时代男孩比女孩得到更多机会。
45题是被动语态，boys were ... much more than girls，结合 just before WWII、typical families 和女孩不能上学的背景，合理含义是男孩更受偏爱，所以选 favored。
tolerated 表示容忍过错，但男孩女孩本身没有过错；trusted 表示信任可靠性，文章并未讨论谁更可靠；acknowledged 表示承认、认可某事的存在或合理性，也不能解释男孩和女孩机会差异。`, synonym: "favored 与 boys more than girls 构成重男轻女语境。" },
      { id: 46, part: "noun", answer: "housework", options: ["gardening", "homework", "business", "housework"], clueType: "名词对应内容", clue: "stay at home", clueTargets: ["actor-grandma-stay", "stay-home"], logic: `46题是名词题，直接找和 stay at home 对应的内容。奶奶不能上学，只能待在家里，所以要做的是 housework 家务活。
gardening 只是家务的一小类，不如 housework 概括准确；business 和小女孩待在家里的情境不对应；homework 是作业，但前文已经说她没有机会去 school，因此也不成立。`, synonym: "housework 与 stay at home 构成生活内容对应。" },
      { id: 47, part: "verb", answer: "study", options: ["exercise", "study", "explore", "teach"], clueType: "动作逻辑顺序", clue: "did not have a chance to go to school / Chinese lessons", clueTargets: ["actor-she-seize", "actor-brother", "no-school", "chinese-lessons"], logic: `47题接续上文：奶奶没有机会上学，只能在家做家务。这里说 the only opportunity she could seize to ...，她唯一能抓住的机会自然是 study。
后文 her brother was having Chinese lessons with the family tutor 继续给出学习线索。exercise 可指练习或锻炼，但没有明确学习对象；explore 强调探索；teach 是老师或教学者的动作，都不符合奶奶当时的身份和动作顺序。`, synonym: "study 与 school / lessons 形成学习语义链。" },
      { id: 48, part: "noun", answer: "lessons", options: ["food", "guests", "lessons", "tea"], clueType: "名词对应内容", clue: "family tutor", clueTargets: ["actor-brother", "chinese-lessons", "family-tutor"], logic: `48题是很直接的名词对应。空格前是 Chinese，后面是 with the family tutor。家庭教师对应的活动一定是 lessons 课程。
food、guests、tea 都不能和 family tutor 形成学习场景，也不能解释奶奶为什么能借机 study。`, synonym: "lessons 与 tutor 是直接搭配线索。" },
      { id: 49, part: "connector", answer: "closely", options: ["closely", "directly", "nervously", "freely"], clueType: "副词描述动作状态", clue: "sit quietly at the far end / listening", clueTargets: ["actor-she-sit", "sit-quietly", "listening"], logic: `49题考副词描述动作状态，描述对象是 listening。前半句说她 would sit quietly at the far end of the long dinner table，说明她不能正式上课，只能安静坐在远处听。
在这种语境下，listening 的合理状态是 closely，表示仔细地、认真地听。directly 强调没有中间环节，和听课动作不搭；nervously 描述紧张心理，文章没有紧张线索；freely 表示自由无约束，而她坐在远端安静旁听，恰恰说明不自由。`, synonym: "closely 与 quietly listening 构成认真听的动作状态。" },
      { id: 50, part: "adjective", answer: "practical", options: ["professional", "awkward", "simple", "practical"], clueType: "形容词描述名词性质", clue: "skill / whenever we share the newspaper", clueTargets: ["actor-training", "actor-we-share", "skill", "newspaper"], logic: `形容词先找描述对象。这里描述的是 a skill，也就是奶奶倒着读写中文的能力。后半句 especially whenever we share the newspaper 给出这个技能的实际应用场景：一起看报纸时用得上。
所以答案是 practical，表示实用的。awkward 是负态度，但文中没有否定奶奶；professional 需要专业领域或复杂深度的对应内容，simple 需要“容易掌握、浅显”的线索，文章都没有。turn out 表示“结果是、原来是”，也是这里判断技能性质的关键短语。`, synonym: "practical 与 share the newspaper 的应用场景呼应。" },
      { id: 51, part: "noun", answer: "beach", options: ["market", "mountain", "beach", "class"], clueType: "名词对应内容", clue: "deep water / underwater / seabed", clueTargets: ["actor-grandmother-brother", "deep-water", "underwater", "seabed"], logic: `51题看后文场景。后面连续出现 deep water、underwater、seabed，说明周末去的地方和水下活动有关。
四个选项里只有 beach 海滩能承接这些内容。market、mountain、class 都无法对应后文“穿过深水、坐在水下、海底”的场景。`, synonym: "beach 与 deep water / underwater / seabed 同场复现。" },
      { id: 52, part: "noun", answer: "breath", options: ["secret", "breath", "view", "tongue"], clueType: "名词动作搭配", clue: "underwater / hold their", clueTargets: ["actor-they-underwater", "deep-water", "underwater"], logic: `52题看动作和场景搭配。句子说 they would walk through deep water, sit down cross-legged underwater and hold their ...，人在水下最自然的动作就是 hold their breath，屏住呼吸。
secret 和 tongue 没有水下动作对应；view 是“看法、风景”，不能和 hold 构成这里的动作关系，而且他们看到的内容已经在 while they watched ... 中说明。`, synonym: "breath 与 underwater 构成生理动作对应。" },
      { id: 53, part: "verb", answer: "admire", options: ["admire", "notice", "adopt", "value"], clueType: "动作与名词的关系", clue: "her ability ... still sit comfortably on the seabed", clueTargets: ["actor-i-admire", "actor-ability", "ability", "comfortably"], logic: `53、54可以先解决名词题，再看动词。破折号后解释 something 的具体内容：her ability to open her eyes underwater and still sit comfortably on the seabed。这个能力很特别，所以“我”对它的态度应是 admire，钦佩。
notice 是偶然注意到，动作太短，不能表达作者对能力的态度；adopt 表示采纳、采用或领养，不能和 her ability 合理搭配；value 表示重视其价值，但这里更突出作者对奶奶能力本身的钦佩。`, synonym: "admire 与 ability / comfortably on the seabed 形成评价关系。" },
      { id: 54, part: "noun", answer: "eyes", options: ["hands", "mouth", "eyes", "arms"], clueType: "名词对应内容", clue: "watched all action going on around them / underwater", clueTargets: ["actor-they-underwater", "actor-ability", "watched-action", "underwater"], logic: `54题的名词线索在上文：they watched all action going on around them。既然是在水下看周围的活动，能够对应 open her ... 的只能是 eyes。
hands 是摊开双手，arms 是张开双臂，都和“看”没有关系；mouth 在水下张开也不合理，甚至危险。`, synonym: "eyes 与 watched all action 直接对应。" },
      { id: 55, part: "adjective", answer: "happy", options: ["difficult", "complex", "happy", "similar"], clueType: "形容词描述名词性质", clue: "did not need to go through the hardships", clueTargets: ["actor-my-childhood", "actor-i-no-hardships", "no-hardships"], logic: `55题的形容词描述对象是 My childhood。和奶奶的童年相比，作者的童年不需要经历她那样的艰辛，也不用面对教育机会的问题，所以整体应是正态度概括。
happy 在这里可理解为幸福的、快乐的。difficult 和 complex 都是负态度，和后文“不需要经历艰辛”矛盾；similar 与第二段开头 an entirely different childhood lifestyle 直接矛盾。`, synonym: "happy 与 did not need hardships 构成正向概括。" },
      { id: 56, part: "adjective", answer: "grateful", options: ["grateful", "surprised", "convinced", "regretful"], clueType: "形容词描述人物心理", clue: "did not need to go through the hardships", clueTargets: ["actor-i-no-hardships", "no-hardships"], logic: `56题四个选项都描述人物心理，心理一定要有事件对应。后文说 I did not need to go through the hardships like she did，作者意识到自己没有经历奶奶那样的艰辛，因此合理心理是 grateful，感激的。
surprised 需要意外事件，convinced 表示对某观点深信不疑，regretful 表示后悔或有过失，文章都没有这些心理来源。grateful 才能和“没有经历那些艰辛、没有面对那些问题”形成对应。`, synonym: "grateful 与没有经历艰辛形成因果。" },
      { id: 57, part: "verb", answer: "go through", options: ["reflect upon", "go through", "ask about", "prepare for"], clueType: "动词短语搭配", clue: "the hardships like she did", clueTargets: ["actor-i-no-hardships", "hardships"], logic: `57题考动词短语。空格后的对象是 the hardships like she did，和 hardships 最自然的动词短语是 go through，表示经历苦难、熬过艰辛。
reflect upon 是反思，ask about 是询问，prepare for 是为……做准备，都不是作者“不需要对艰辛做的动作”。这里强调的是作者没有亲身经历奶奶经历过的艰辛。`, synonym: "go through 与 hardships 是常见搭配。" },
      { id: 58, part: "noun", answer: "education", options: ["unemployment", "health", "education", "communication"], clueType: "全文主线回扣", clue: "did not have a chance to go to school", clueTargets: ["actor-ive-never", "no-school"], logic: `58题回扣全文主线。前文反复写奶奶没有机会去 school，只能借哥哥上 Chinese lessons 时旁听学习，因此她面对的问题本质上是 education 教育问题。
unemployment 失业、health 健康、communication 沟通交流都没有在文章中形成主线，也不能解释奶奶童年的核心遗憾。`, synonym: "education 与 school / study / lessons 形成主题复现。" },
      { id: 59, part: "verb", answer: "talk", options: ["attend", "refer", "lead", "talk"], clueType: "动词短语搭配", clue: "my grandmother ... her stories", clueTargets: ["actor-background", "actor-grandmother-talk", "stories"], logic: `59题看动词与 to 的搭配。四个选项分别可构成 attend to 处理，refer to 指的是、参考，lead to 导致，talk to 与某人交谈。
文章一直写奶奶给作者讲故事，最后说她是 an amazing person to ... to，最合理的是 talk to，表示奶奶是一个很棒的交谈对象。其他三个短语都不能和 person 以及 her stories 形成自然关系。`, synonym: "talk to 与 stories 构成交谈对象关系。" },
      { id: 60, part: "verb", answer: "come alive", options: ["come true", "come round", "come out", "come alive"], clueType: "动词短语含义", clue: "her stories / history textbooks", clueTargets: ["actor-stories", "stories", "textbooks"], logic: `60题同样考动词短语含义。主语是 my history textbooks，前面线索是 her stories always make ...。奶奶的亲身故事让历史课本里的内容变得生动、鲜活，所以选 come alive。
come true 表示梦想成真，come round 表示苏醒或再度出现，come out 表示出现、出版或结果出来，都不能表达“历史课本因故事而变得栩栩如生”。`, synonym: "come alive 与 stories make textbooks 生动化呼应。" }
    ],
    sentenceData: [
      { en: `One day, we had a family dinner.`, zh: "一天，我们家举行了一次家庭晚餐。", html: `One day, we had a family dinner.` },
      { en: `While the adults were busy with their serious talk outside, I was left alone in the kitchen to help my grandmother wash dishes.`, zh: "当大人们在外面忙着严肃谈话时，我一个人留在厨房帮奶奶洗碗。", html: `While <span data-clue="actor-adults">the adults</span> were busy with their serious talk <span data-clue="outside">outside</span>, <span data-clue="actor-i-left">I</span> was left alone in the <button class="blank-token" data-qid="41">41</button> to help my grandmother <span data-clue="wash-dishes">wash dishes</span>.` },
      { en: `As always my grandmother would tell me stories about her childhood.`, zh: "和往常一样，奶奶会给我讲她童年的故事。", html: `<button class="blank-token" data-qid="42">42</button> <span data-clue="actor-grandmother-42">my grandmother</span> <span data-clue="would-tell">would tell me stories</span> about her childhood.` },
      { en: `Born just before WWII, my grandmother experienced an entirely different childhood lifestyle from mine.`, zh: "奶奶出生在二战前不久，她经历了和我完全不同的童年生活方式。", html: `Born just before WWII, <span data-clue="actor-grandmother-43">my grandmother</span> <button class="blank-token" data-qid="43">43</button> an <span data-clue="different-childhood">entirely different childhood lifestyle</span> from mine.` },
      { en: `She did not have a chance to go to school.`, zh: "她没有机会上学。", html: `<span data-clue="actor-she-school">She</span> <span data-clue="no-school">did not have a chance to go to</span> <button class="blank-token" data-qid="44">44</button>.` },
      { en: `Like in typical families, where boys were favored much more than girls, my grandma had to stay at home to do housework.`, zh: "就像典型家庭那样，男孩比女孩更受偏爱，奶奶不得不留在家里做家务。", html: `Like in typical families, where <span data-clue="boys-girls"><span data-clue="actor-boys">boys</span> were</span> <button class="blank-token" data-qid="45">45</button> much more than girls, <span data-clue="actor-grandma-stay">my grandma</span> had to <span data-clue="stay-home">stay at home</span> to do <button class="blank-token" data-qid="46">46</button>.` },
      { en: `The only opportunity she could seize to study was when her brother was having Chinese lessons with the family tutor.`, zh: "她唯一能抓住的学习机会，是哥哥跟家庭教师上中文课的时候。", html: `The only opportunity <span data-clue="actor-she-seize">she</span> could seize to <button class="blank-token" data-qid="47">47</button> was when <span data-clue="actor-brother">her brother</span> was having <span data-clue="chinese-lessons">Chinese</span> <button class="blank-token" data-qid="48">48</button> with the <span data-clue="family-tutor">family tutor</span>.` },
      { en: `She would sit quietly at the far end of the long dinner table, listening closely.`, zh: "她会安静地坐在长餐桌的远端，仔细听着。", html: `<span data-clue="actor-she-sit">She</span> would <span data-clue="sit-quietly">sit quietly at the far end</span> of the long dinner table, <span data-clue="listening">listening</span> <button class="blank-token" data-qid="49">49</button>.` },
      { en: `This training taught her to read and write her Chinese upside down-a skill that has turned out to be quite practical, especially whenever we share the newspaper.`, zh: "这种训练教会她倒着读写中文，这项技能后来证明相当实用，尤其是我们一起看报纸的时候。", html: `<span data-clue="actor-training">This training</span> taught her to <span data-clue="read-write">read and write her Chinese upside down</span>-a <span data-clue="skill">skill</span> that has turned out to be quite <button class="blank-token" data-qid="50">50</button>, especially whenever <span data-clue="actor-we-share">we</span> share the <span data-clue="newspaper">newspaper</span>.` },
      { en: `On most weekends, my grandmother, a young girl then, and her brother would go to the beach.`, zh: "大多数周末，还是小女孩的奶奶会和哥哥去海滩。", html: `On most weekends, <span data-clue="actor-grandmother-brother">my grandmother, a young girl then, and her brother</span> would go to the <button class="blank-token" data-qid="51">51</button>.` },
      { en: `There, they would walk through deep water, sit down cross-legged underwater and hold their breath while they watched all action going on around them.`, zh: "在那里，他们会穿过深水，盘腿坐在水下并屏住呼吸，看着周围发生的一切。", html: `There, <span data-clue="actor-they-underwater">they</span> would walk through <span data-clue="deep-water">deep water</span>, sit down cross-legged <span data-clue="underwater">underwater</span> and hold their <button class="blank-token" data-qid="52">52</button> while they <span data-clue="watched-action">watched all action going on around them</span>.` },
      { en: `This is something I admire-her ability to open her eyes underwater and still sit comfortably on the seabed.`, zh: "这是我很钦佩的一点：她能在水下睁开眼睛，还能舒服地坐在海底。", html: `This is something <span data-clue="actor-i-admire">I</span> <button class="blank-token" data-qid="53">53</button>-<span data-clue="actor-ability">her</span> <span data-clue="ability">ability</span> to open her <button class="blank-token" data-qid="54">54</button> underwater and still sit <span data-clue="comfortably">comfortably</span> on the <span data-clue="seabed">seabed</span>.` },
      { en: `My childhood is quite happy compared with hers.`, zh: "和她的童年相比，我的童年相当幸福。", html: `<span data-clue="actor-my-childhood">My childhood</span> is quite <button class="blank-token" data-qid="55">55</button> compared with hers.` },
      { en: `I am grateful that I did not need to go through the hardships like she did.`, zh: "我很感激自己不必像她那样经历那些艰辛。", html: `<span data-clue="actor-i-no-hardships">I</span> am <button class="blank-token" data-qid="56">56</button> that <span data-clue="no-hardships">I did not need to <button class="blank-token" data-qid="57">57</button> the <span data-clue="hardships">hardships</span> like she did</span>.` },
      { en: `I've never faced the problem of education.`, zh: "我从未面对过教育方面的问题。", html: `<span data-clue="actor-ive-never">I've</span> never faced the problem of <button class="blank-token" data-qid="58">58</button>.` },
      { en: `I guess our different childhood background is what makes my grandmother such an amazing person to talk to: her stories always make my history textbooks come alive.`, zh: "我想，我们不同的童年背景让奶奶成为一个很棒的交谈对象：她的故事总能让我的历史课本变得生动起来。", html: `I guess <span data-clue="actor-background">our different childhood background</span> is what makes <span data-clue="actor-grandmother-talk">my grandmother</span> such an amazing person to <button class="blank-token" data-qid="59">59</button> to: <span data-clue="stories"><span data-clue="actor-stories">her stories</span></span> always make my history <span data-clue="textbooks">textbooks</span> <button class="blank-token" data-qid="60">60</button>.` }
    ],
    glossary: { family: "家庭", dinner: "晚餐", adults: "成年人", serious: "严肃的", outside: "在外面", "sitting room": "起居室", kitchen: "厨房", yard: "院子", "dining hall": "餐厅", grandmother: "奶奶", dishes: "餐具", "as always": "和往常一样", "by the way": "顺便说一下", "for example": "例如", "here and now": "此时此刻", childhood: "童年", adjusted: "调整", promoted: "促进；推广", achieved: "实现；取得", experienced: "经历", work: "工作", school: "学校", court: "法院", press: "出版社；新闻界", favored: "偏爱", tolerated: "容忍", trusted: "信任", acknowledged: "承认；认可", gardening: "园艺", homework: "作业", business: "生意", housework: "家务", exercise: "锻炼", study: "学习", explore: "探索", teach: "教", food: "食物", guests: "客人", lessons: "课程", tea: "茶", closely: "仔细地", directly: "直接地", nervously: "紧张地", freely: "自由地", professional: "专业的", awkward: "尴尬的；笨拙的", simple: "简单的", practical: "实用的", market: "市场", mountain: "山", beach: "海滩", class: "班级；课", secret: "秘密", breath: "呼吸", view: "看法；风景", tongue: "舌头；语言", admire: "钦佩", notice: "注意到", adopt: "采纳；领养", value: "珍视；重视", hands: "手", mouth: "嘴", eyes: "眼睛", arms: "手臂", difficult: "困难的", complex: "复杂的", happy: "幸福的；快乐的", similar: "相似的", grateful: "感激的", surprised: "惊讶的", convinced: "深信的", regretful: "后悔的", "reflect upon": "反思", "go through": "经历", "ask about": "询问", "prepare for": "为……做准备", unemployment: "失业", health: "健康", education: "教育", communication: "沟通", attend: "参加；处理", refer: "提到；指的是", lead: "导致；带领", talk: "交谈", "come true": "实现", "come round": "苏醒；再度出现", "come out": "出现；出版", "come alive": "变得生动", stories: "故事", textbooks: "教科书" }
  },
  "practice-2-2024-new-gaokao-i": {
    title: "2024年新高考I卷｜运动目标与自我成长",
    source: "2024年新高考I卷",
    lead: "I've been motivated—and demotivated—by other folks' achievements all my life.",
    closing: "I've come to accept that whatever goals I set for myself, they just have to be my own.",
    notes: ["人物：I，一个容易受他人成就影响的叙述者", "事件：从跑步到骑行，经历比较和挫败后重新理解目标", "环境：马拉松、骑行、San Diego 山谷道路", "主旨：目标不必和别人比较，只要属于自己"],
    tone: "正确文章基调：从受刺激和挫败，转向成熟自省。首句直接点出 motivated 与 demotivated 的摇摆，结尾落到 my own goals，说明全文核心是停止比较，建立自己的目标。",
    questions: [
      { id: 41, part: "verb", answer: "won", options: ["knew", "held", "won", "quit"], clueType: "动作逻辑顺序", clue: "other folks' achievements / Feeling motivated / marathon race", clueTargets: ["achievements", "motivated", "marathon"], logic: `文章第一段是总括段，主题是“别人的成就让我受到激励或感到沮丧”。所以邻居朋友对 marathon race 做的动作，必须能构成 achievement，并且能解释下一句 Feeling motivated。
因此答案是 won，表示赢得马拉松比赛。knew 只是知道或熟悉，held 是举办，quit 是退出，都不能和“成就”形成关系，也不能自然引出“我受到激励后开始跑步”。`, synonym: "won 与 achievements / Feeling motivated 构成动作顺序。" },
      { id: 42, part: "connector", answer: "regularly", options: ["regularly", "silently", "proudly", "recently"], clueType: "副词描述动作状态", clue: "Feeling motivated / started running", clueTargets: ["motivated", "started-running"], logic: `42题用副词描述 running 的状态。作者因为邻居朋友赢得马拉松而 Feeling motivated，合理的后续动作是开始定期跑步，因此选 regularly。
proudly 通常描述取得成就后的骄傲状态，recently 表示时间距离现在不久，都不能描述“受到激励后跑步”的训练状态。silently 表示没有声音，有的同学可能想理解成“默默下定决心”，但这里副词修饰的是 running，不是心理活动；“无声地跑步”不符合客观语句。`, synonym: "regularly 与 motivated 后的 started running 对应。" },
      { id: 43, part: "verb", answer: "training", options: ["asking", "looking", "waiting", "training"], clueType: "动作与名词的关系", clue: "for a super / 52.4-mile double marathon", clueTargets: ["super-marathon"], logic: `女孩对 a “super” 做动作，而 super 指的是 52.4-mile double marathon。面对一场双倍马拉松，合理动作是 training for，为比赛训练。
asking for 是请求，looking for 是寻找，waiting for 是等待，它们都能和 for 构成短语，但都不是女孩对马拉松比赛应做的动作。`, synonym: "training for 与 marathon race 构成备赛关系。" },
      { id: 44, part: "verb", answer: "hated", options: ["made", "believed", "hated", "deserved"], clueType: "动作逻辑顺序", clue: "To be honest / longest run / pure boredom of jogging", clueTargets: ["longest-run", "boredom"], logic: `To be honest 是重要提示，常用来引出真实但和前文语气相反的内容，可以视作转折逻辑。作者前面受到激励去跑步，但跑了最长的 15 miles 后，后文又说 pure boredom of jogging，所以这里要转向负态度。
四个选项中唯一明确负态度的是 hated。感叹号说明语气强烈，I made it! 是“我做到了”，I hated it! 是“我烦死了”；结合后文 boredom，只能选 hated。believed it 很少见且无语义支撑，deserved it 常用于“你应得的”，不符合作者此处自述。`, synonym: "hated 与 To be honest / boredom 构成由正转负。" },
      { id: 45, part: "noun", answer: "achievement", options: ["advantage", "achievement", "contribution", "influence"], clueType: "名词对应内容", clue: "the girl / 52.4-mile double marathon / my longest run-15 miles", clueTargets: ["super-marathon", "longest-run", "achievements"], logic: `45题前后是 my ... seem small，需要找“我”的什么东西显得很小。女孩要跑 52.4 英里的双倍马拉松，而作者拼尽全力只跑了 15 英里，对比之下，作者自己的 achievement 显得微不足道。
文章里没有提到作者的 advantage 优势、contribution 贡献或 influence 影响，这些名词都没有具体对应内容。achievement 还和首段 other folks' achievements 形成主题复现。`, synonym: "achievement 与 achievements / longest run 形成复现和对比。" },
      { id: 46, part: "noun", answer: "reason", options: ["way", "risk", "place", "reason"], clueType: "名词对应条件", clue: "the only ... is if a big dog was running after me", clueTargets: ["big-dog"], logic: `先看句子结构：I'd ever run again 是修饰前面名词的从句，主干是 the only ___ is if a big dog was running after me。大狗追着我跑，不是再次跑步的方法、地点或风险，而是再次跑步的唯一 reason。
字面意思是“我再次跑步的唯一原因是有一条大狗追我”。换成自然表达就是：除非有大狗追我，否则我再也不跑步了。这里完成了作者从 motivated 到 demotivated 的变化。`, synonym: "reason 与 if 条件句直接对应。" },
      { id: 47, part: "verb", answer: "turned to", options: ["gave up", "went on", "turned to", "dealt with"], clueType: "动作逻辑顺序", clue: "So / cycling / got a good bike", clueTargets: ["cycling", "good-bike"], logic: `句首 So 表示承接上文。作者因为跑步受挫，决定不再跑步，于是转向 cycling。turn to sb./sth. 可以表示向某人求助，也可以表示转而做某事。
gave up 是放弃，后面接 cycling 就变成放弃骑行，和下文 got a good bike and rode a lot 矛盾。went on 是继续，无法体现从跑步到骑行的转换。dealt with 的对象通常是问题或困难，不能自然接 cycling。`, synonym: "turned to 与从 running 转到 cycling 对应。" },
      { id: 48, part: "verb", answer: "dreamed", options: ["heard", "dreamed", "complained", "approved"], clueType: "动作逻辑顺序", clue: "got a good bike / rode a lot / entering cycle races", clueTargets: ["good-bike", "cycle-races"], logic: `前文是 I got a good bike and rode a lot，后面是 entering cycle races。买车、经常骑车之后，合理的心理和动作发展是 dreamed of entering cycle races，梦想参加自行车比赛。
hear of 是听说，不能说“听说参加比赛”；complain of 的对象多是负面情况；approve of 表示批准或赞同，动作发出者通常需要有更高地位或资格。这三个都无法和“买车、骑车、参加比赛”形成顺序。`, synonym: "dreamed of entering 与 cycle races 是自然搭配。" },
      { id: 49, part: "verb", answer: "borrowed", options: ["painted", "borrowed", "bought", "parked"], clueType: "动作与名词的关系", clue: "my sister / her bike / went for a ride", clueTargets: ["sister-bike"], logic: `动作对象是 her bike，连续动作是 went for a ride。作者去看姐姐，在姐姐上班时对她的自行车做动作，然后出去骑车，最合理的是 borrowed，借了她的自行车。
painted 是粉刷或描画，bought 是购买，parked 是停车，都不能和 her bike and went for a ride 构成合理连续动作。`, synonym: "borrowed 与 her bike / went for a ride 构成动作链。" },
      { id: 50, part: "noun", answer: "problem", options: ["problem", "secret", "principle", "advice"], clueType: "名词对应内容", clue: "roads went through large valleys / uphill for miles", clueTargets: ["uphill"], logic: `空格后面的冒号说明，后一句就是这个名词的解释。那里的道路穿过大片山谷，作者要一次骑好几英里的上坡路。对于作者来说，这显然是困难和问题。
因此选 problem。secret 是秘密，principle 是原则，advice 是建议，它们都不能由冒号后的 uphill for miles 来解释。`, synonym: "problem 与 uphill for miles 构成解释关系。" },
      { id: 51, part: "noun", answer: "challenges", options: ["dangers", "events", "opponents", "challenges"], clueType: "名词对应内容", clue: "such / uphill for miles / problem", clueTargets: ["uphill"], logic: `such 表明 51 题要回指前文内容。前文的 problem 是大片山谷和连续上坡，对作者来说，这是从未面对过的 challenges。
dangers 要涉及人身安全威胁，events 是单一公开活动或事件，opponents 是对手或反对者，文章都没有对应。challenges 和前面的 problem / uphill for miles 是同一内容的再概括。`, synonym: "challenges 与 problem / uphill for miles 重复对应。" },
      { id: 52, part: "verb", answer: "passed", options: ["passed", "convinced", "admired", "stopped"], clueType: "动作与名词的关系", clue: "100 local bikers / used to such roads", clueTargets: ["local-bikers"], logic: `get + done 是高考常见结构，表示某个动作被做。52题的动作发出者是 about 100 local bikers，他们习惯这种路况；作者不习惯山路，骑得慢，所以被他们 passed，超过。
convinced 是说服或使信服，admired 是钦佩，stopped 是停止或制止，都不是本地骑手对作者做的合理动作。这个情节再次体现作者开始很有热情，但看到别人做得更好后产生挫败感。`, synonym: "passed 与 local bikers / used to such roads 对应。" },
      { id: 53, part: "adjective", answer: "appealing", options: ["reliable", "convenient", "familiar", "appealing"], clueType: "形容词描述名词性质", clue: "got passed / riding my bike didn't seem quite as", clueTargets: ["local-bikers"], logic: `seem + adjective 是核心结构，形容词描述 riding my bike 的性质。suddenly 表示性质发生转变：作者被大约 100 名本地骑手超过后，骑车不再像之前那样吸引他。
如果选 reliable，就是从可靠变不可靠；convenient 是从方便变不方便；familiar 是从熟悉变不熟悉，这些都不符合文章。appealing 表示有吸引力，not quite as appealing 正好对应作者从 motivated 到 demotivated 的主题变化。`, synonym: "not appealing 与被 local bikers 超过后的挫败感对应。" },
      { id: 54, part: "verb", answer: "matured", options: ["traveled", "matured", "missed", "worried"], clueType: "结尾升华", clue: "I've come to accept", clueTargets: ["come-accept"], logic: `最后一段是全文总结，后面的连续动作是 come to accept，表示作者逐渐接受、逐渐明白自己的目标应属于自己。能形成这种认知变化的动作是 matured，变得成熟。
traveled 与全文无关。missed 和 worried 都是偏负态度，既不能和 come to accept 构成合理顺序，也不符合高考记叙文常见的正向结尾。`, synonym: "matured 与 come to accept 构成总结升华。" },
      { id: 55, part: "noun", answer: "goals", options: ["limits", "dates", "goals", "tests"], clueType: "主旨名词", clue: "set for myself / my own", clueTargets: ["my-own"], logic: `55题后面的 I set for myself 就是名词的对应内容。能“为自己设定”的最自然是 goals，目标。句意是：无论我给自己设定什么目标，它们都必须是我自己的目标。
limits 限制、dates 日期或约会、tests 测试都不能自然接 set for myself 并承接全文主旨。文章的核心不是不要有目标，而是目标不应该被别人的做法和结果干扰。`, synonym: "goals 与 set for myself / my own 构成全文主旨。" }
    ],
    sentenceData: [
      { en: `I've been motivated-and demotivated-by other folks' achievements all my life.`, zh: "我一生都被别人的成就激励过，也被它们打击过。", html: `I've been motivated-and demotivated-by other folks' <span data-clue="achievements">achievements</span> all my life.` },
      { en: `When I was a teenager, a neighborhood friend won a marathon race.`, zh: "我十几岁时，一个邻居朋友赢得了一场马拉松比赛。", html: `When I was a teenager, a neighborhood friend <button class="blank-token" data-qid="41">41</button> a <span data-clue="marathon">marathon race</span>.` },
      { en: `Feeling motivated, I started running regularly, but then two things happened.`, zh: "受到激励后，我开始规律跑步，但随后发生了两件事。", html: `Feeling <span data-clue="motivated">motivated</span>, I <span data-clue="started-running">started running</span> <button class="blank-token" data-qid="42">42</button>, but then two things happened.` },
      { en: `First, a girl I met one day told me she was training for a super, referring to a 52.4-mile double marathon.`, zh: "首先，有一天我遇到的一个女孩告诉我她正在为一场“超级”马拉松训练，也就是52.4英里的双倍马拉松。", html: `First, a girl I met one day told me she was <button class="blank-token" data-qid="43">43</button> for a <span data-clue="super-marathon">super, referring to a 52.4-mile double marathon</span>.` },
      { en: `Then, the next day I went on my longest run-15 miles.`, zh: "然后，第二天我进行了自己最长的一次跑步，15英里。", html: `Then, the next day I went on my <span data-clue="longest-run">longest run-15 miles</span>.` },
      { en: `To be honest, I hated it.`, zh: "说实话，我讨厌它。", html: `To be honest, I <button class="blank-token" data-qid="44">44</button> it!` },
      { en: `Between the girl making my achievement seem small and the pure boredom of jogging, I decided that the only reason I'd ever run again is if a big dog was running after me.`, zh: "那个女孩让我自己的成就显得渺小，再加上慢跑纯粹的无聊，我决定以后再跑步的唯一理由就是有大狗追我。", html: `Between the girl making my <button class="blank-token" data-qid="45">45</button> seem small and the pure <span data-clue="boredom">boredom</span> of jogging, I decided that the only <button class="blank-token" data-qid="46">46</button> I'd ever run again is if a <span data-clue="big-dog">big dog was running after me</span>!` },
      { en: `So I turned to cycling.`, zh: "于是我转向了骑行。", html: `So I <button class="blank-token" data-qid="47">47</button> <span data-clue="cycling">cycling</span>.` },
      { en: `I got a good bike and rode a lot.`, zh: "我买了一辆好自行车，并且骑了很多。", html: `I got a <span data-clue="good-bike">good bike</span> and rode a lot.` },
      { en: `I dreamed of entering cycle races until I flew to San Diego to visit my sister.`, zh: "我一直梦想参加自行车比赛，直到我飞去圣迭戈看望姐姐。", html: `I <button class="blank-token" data-qid="48">48</button> of entering <span data-clue="cycle-races">cycle races</span> until I flew to San Diego to visit my sister.` },
      { en: `While she was at work one day, I borrowed her bike and went for a ride.`, zh: "有一天她上班时，我借了她的自行车出去骑。", html: `While she was at work one day, I <button class="blank-token" data-qid="49">49</button> <span data-clue="sister-bike">her bike</span> and went for a ride.` },
      { en: `The problem: The roads there went through large valleys where I'd be riding uphill for miles at a time.`, zh: "问题是：那里的道路穿过大片山谷，我会一次骑好几英里的上坡。", html: `The <button class="blank-token" data-qid="50">50</button>: The roads there went through large valleys where I'd be riding <span data-clue="uphill">uphill for miles</span> at a time.` },
      { en: `I'd never faced such challenges.`, zh: "我从未面对过这样的挑战。", html: `I'd never faced such <button class="blank-token" data-qid="51">51</button>.` },
      { en: `That day, I got passed by about 100 local bikers who were used to such roads.`, zh: "那天，我被大约100个习惯这种道路的当地骑手超过。", html: `That day, I got <button class="blank-token" data-qid="52">52</button> by about 100 <span data-clue="local-bikers">local bikers who were used to such roads</span>.` },
      { en: `When I got back home, suddenly riding my bike didn't seem quite as appealing.`, zh: "回家后，骑自行车突然似乎不再那么有吸引力了。", html: `When I got back home, suddenly riding my bike didn't seem quite as <button class="blank-token" data-qid="53">53</button>.` },
      { en: `I've matured a lot since then.`, zh: "从那以后，我成熟了很多。", html: `I've <button class="blank-token" data-qid="54">54</button> a lot since then.` },
      { en: `I've come to accept that whatever goals I set for myself, they just have to be my own.`, zh: "我逐渐接受了：无论我为自己设定什么目标，它们都必须是我自己的。", html: `I've <span data-clue="come-accept">come to accept</span> that whatever <button class="blank-token" data-qid="55">55</button> I set for myself, they just have to be <span data-clue="my-own">my own</span>.` }
    ],
    glossary: { knew: "知道", held: "举办；持有", won: "赢得", quit: "放弃", regularly: "规律地", silently: "安静地", proudly: "自豪地", recently: "最近", asking: "询问", looking: "寻找", waiting: "等待", training: "训练", made: "制作；使", believed: "相信", hated: "讨厌", deserved: "值得", advantage: "优势", achievement: "成就", contribution: "贡献", influence: "影响", way: "方式", risk: "风险", place: "地方", reason: "理由", "gave up": "放弃", "went on": "继续", "turned to": "转向", "dealt with": "处理", heard: "听说", dreamed: "梦想", complained: "抱怨", approved: "赞成", painted: "涂画", borrowed: "借", bought: "购买", parked: "停车", problem: "问题", secret: "秘密", principle: "原则", advice: "建议", dangers: "危险", events: "事件", opponents: "对手", challenges: "挑战", passed: "超过", convinced: "说服", admired: "钦佩", stopped: "停止", reliable: "可靠的", convenient: "方便的", familiar: "熟悉的", appealing: "有吸引力的", traveled: "旅行", matured: "成熟", missed: "错过；想念", worried: "担心", limits: "限制", dates: "日期", goals: "目标", tests: "测试", motivated: "被激励的", demotivated: "受打击的", achievements: "成就", marathon: "马拉松", cycling: "骑行", bike: "自行车", uphill: "上坡", bikers: "骑手" }
  },
  "practice-3-2024-new-gaokao-i": {
    title: "2024年新高考Ⅱ卷｜意大利生活与家庭餐桌",
    source: "2024年新高考Ⅱ卷",
    lead: "When I decided to buy a house in Europe ten years ago, I didn’t think too long.",
    closing: "Whatever disadvantages life in Italy might have, the problems are forgotten once you sit down to a big meal with friends and family.",
    notes: ["人物：I，一个在意大利定居的叙述者", "事件：作者从选择意大利定居，到感受语言鼓励、邻里善意和家庭餐桌文化", "环境：意大利生活、邻里社区、家庭聚餐", "主旨：异国生活中的善意与餐桌文化让新国家像家一样温暖"],
    tone: "正确文章基调：积极、温暖、归属感增强。首句确定作者选择意大利，结尾落到朋友和家人的大餐让问题被忘记，说明全文核心是意大利人的善意与饮食文化带来的家的感觉。",
    questions: [
      { id: 41, part: "verb", answer: "settle", options: ["study", "rent", "visit", "settle"], clueType: "动作逻辑顺序", clue: "buy a house in Europe / traveling in France / picking my favorite spot", clueTargets: ["buy-house", "permanent-home"], logic: `动词题要看动作逻辑顺序。前面已知动作是 decided to buy a house in Europe 和 picking my favorite spot，再结合 traveling in France 与 but 的转折，说明作者不是在说短期旅游地点，而是在说长期生活的地点。
所以答案是 settle，安顿、定居。旅游是短期行为，定居是长期行为，这正是 but 后转折的意义。study 学习、rent 租赁、visit 访问或参观，都不能和买房、挑选长期地点形成合理顺序。`, synonym: "settle 与 buy a house / permanent home 构成长期定居。" },
      { id: 42, part: "verb", answer: "struggled", options: ["planned", "struggled", "refused", "happened"], clueType: "动作逻辑顺序", clue: "first visit / ask for directions or order / But locals smiled", clueTargets: ["ask-order", "locals-smiled"], logic: `看下一句开头 But 的转折。But 后面是正态度动作 locals smiled，所以 42 题应体现负态度或困难状态。
作者第一次到访意大利时，因为语言障碍，在问路和点餐时都很吃力，所以选 struggled to do sth.。planned to do 是计划做某事，happened to do 是碰巧做某事，都不体现困难；refused to do 是拒绝做某事，但后文说作者还在拼凑意大利语句子，说明不是主观拒绝问路或点菜。`, synonym: "struggled 与 ask/order 的语言困难对应。" },
      { id: 43, part: "verb", answer: "string", options: ["string", "hang", "mix", "match"], clueType: "动作逻辑顺序、动作与名词的关系", clue: "a sentence of Italian together", clueTargets: ["sentence-italian"], logic: `43题难度较高，因为 string 作动词相对陌生。string 作名词是“一串、线、琴弦”，作动词可表示“用线串起来、把某物连在一起”。这里 string a sentence together 表示把意大利语句子拼凑起来。
即使不熟悉 string，也可以排除其他基础词。hang 是悬挂，mix 是混合，match 是匹配，这三个动作都不能和 a sentence 形成合理关系。作者是在用生硬的意大利语拼句子，不是在悬挂、混合或匹配句子。`, synonym: "string together 与 sentence 构成拼凑句子。" },
      { id: 44, part: "verb", answer: "praised", options: ["improved", "assessed", "admired", "praised"], clueType: "动作逻辑顺序、动作与名词的关系", clue: "locals smiled / my language skills / encouragement", clueTargets: ["locals-smiled", "encouragement"], logic: `and 前面连接的是正态度动作 smiled，所以 44 题也应体现正态度。下一句 That encouragement 进一步说明，当地人的反应是鼓励作者。
作者还在“拼凑句子”，当地人不可能 improve 改善作者的语言能力，也不太可能 admire 钦佩她的语言能力；assess 评估、打分不体现友好鼓励。最合理的是 praised，称赞她的语言能力，和 smiled 以及 encouragement 呼应。`, synonym: "praised 与 smiled / encouragement 直接对应。" },
      { id: 45, part: "noun", answer: "barrier", options: ["course", "barrier", "area", "test"], clueType: "名词对应内容", clue: "language / struggled / get through", clueTargets: ["ask-order", "sentence-italian"], logic: `这一段一直讲作者在语言方面遇到的困难，所以 language 后最合理的是 barrier，语言障碍。
同时，get through 表示克服某事或度过困难时期，动作对象应是负态度内容，barrier 是唯一符合的选项。course 课程、area 区域、test 测试都和段落内容不对应。`, synonym: "language barrier 与 struggled 使用语言呼应。" },
      { id: 46, part: "adjective", answer: "warm-hearted", options: ["open-minded", "strong-willed", "warm-hearted", "well-informed"], clueType: "形容词描述名词性质", clue: "bring me cheese / remind me to close the window", clueTargets: ["bring-cheese", "close-window"], logic: `形容词描述 Italians 的品质。定性表述一定要看后文细节支撑：邻居会送来新鲜奶酪，还会在快下雨时提醒作者关车窗。
这些都是乐于助人的细节，所以选 warm-hearted，热心的。open-minded 要体现接受新事物，strong-willed 要体现困难中不退缩，well-informed 要体现消息灵通或见多识广，后文都没有对应。`, synonym: "warm-hearted 与送奶酪、提醒关窗的善意行为对应。" },
      { id: 47, part: "verb", answer: "remind", options: ["remind", "allow", "persuade", "order"], clueType: "动作逻辑顺序", clue: "come to my door / close the window / rain is coming", clueTargets: ["close-window"], logic: `邻居在快要下雨时来到门口，让作者关车窗，这一连串动作最自然是 remind sb. to do sth.，提醒某人做某事。
allow sb. to do sth. 表示允许，order sb. to do sth. 表示命令，这两个都涉及身份或地位差异，而作者和邻居没有这种关系。persuade sb. to do sth. 是在对方不接受时努力说服，但下雨关窗没有说服的必要。`, synonym: "remind 与 rain is coming / close the window 对应。" },
      { id: 48, part: "noun", answer: "acts", options: ["tricks", "promises", "acts", "duties"], clueType: "名词对应内容", clue: "small ... of kindness / bring cheese / remind me", clueTargets: ["bring-cheese", "kindness"], logic: `act of kindness 是完形填空中非常常见的主题表达，表示善意的举动。前文送奶酪、提醒关窗，都是 small acts of kindness。
trick 是把戏、花招，含负态度；promise 是承诺，强调未来会做；duty 是职责，本职工作中必须做的事。这些都不能概括邻居自发的善意行为。`, synonym: "acts of kindness 与前文善意举动构成概括。" },
      { id: 49, part: "noun", answer: "appetite", options: ["ambition", "success", "appetite", "growth"], clueType: "名词对应内容", clue: "foodie / stomach / meals", clueTargets: ["foodie", "stomach"], logic: `foodie 美食爱好者、stomach 胃，以及后文多次出现的 meal，都说明这一段与“吃”有关。能被意大利“调动”的相关名词只有 appetite，食欲、胃口。
ambition 志向、success 成功、growth 成长都是核心词，但都和 food / stomach 的语境无关。即使不熟悉 appetite，也能通过排除法确定。`, synonym: "appetite 与 foodie / stomach / meals 同场。" },
      { id: 50, part: "noun", answer: "dish", options: ["costume", "dish", "symbol", "tale"], clueType: "名词对应内容", clue: "traditional / recipe", clueTargets: ["recipe"], logic: `50题和49题同属美食语境。后半句说 every family keeps a recipe passed from one generation to another，recipe 是食谱、配方，所以前面每个城镇有自己的传统 dish，菜肴。
costume 服装、symbol 符号、tale 传说或故事，都和 recipe 没有对应关系。`, synonym: "dish 与 recipe 构成食物语义场。" },
      { id: 51, part: "verb", answer: "gather", options: ["gather", "cheer", "leave", "wait"], clueType: "动作与名词的关系", clue: "Families / for big meals", clueTargets: ["big-meals"], logic: `动作发出者是 Families，后面 for big meals 作补充。家庭成员为了大餐做的合理动作是 gather，聚集、聚会，也就是家庭聚餐。
cheer for 是为某事欢呼加油，与吃饭无关；leave for some place 是出发前往某地；wait for 是等待某事发生。这些都不能自然表达家庭成员聚在一起吃大餐。`, synonym: "gather 与 Families / big meals 对应。" },
      { id: 52, part: "verb", answer: "come up with", options: ["put up with", "stand up for", "come up with", "make up for"], clueType: "动作与名词的关系", clue: "whatever other excuses they can", clueTargets: ["excuses"], logic: `they can ... 是定语从句，补充说明 excuses，意思是“他们能……的理由”。意大利人会因为周日、生日，或者各种能想出来的理由聚餐，所以选 come up with，提出、想出。
put up with 是忍受，对象应是负态度事物；stand up for 是维护、捍卫；make up for 是弥补，通常对象是错误、损失或遗憾。它们都不能和 excuses 构成这里的关系。`, synonym: "come up with excuses 是自然搭配。" },
      { id: 53, part: "verb", answer: "accompanied", options: ["signaled", "confirmed", "represented", "accompanied"], clueType: "动作与名词的关系", clue: "meals / laughter and joy", clueTargets: ["laughter-joy"], logic: `are 与空格构成被动语态，动作发出者是 laughter and joy，动作对象是 These meals。欢声笑语对这些聚餐做的动作，只能是 accompanied by，伴随着。
signal 是发出信号，confirm 是确认不确定的事，represent 是代表或体现典型特征，都不能和 meals / laughter and joy 构成合理关系。`, synonym: "accompanied by 与 laughter and joy 搭配。" },
      { id: 54, part: "noun", answer: "disadvantages", options: ["disadvantages", "meanings", "surprises", "opportunities"], clueType: "名词对应内容", clue: "Whatever ... life in Italy might have / problems", clueTargets: ["problems"], logic: `54题后半句有 problems，前半句能对应的只有 disadvantages，缺点、不利之处。句首 Whatever 形成让步逻辑，前后内容相反：前半句承认意大利生活可能有缺点，后半句说坐下来和亲友吃大餐时问题会被忘记。
meaning 意义、surprise 惊讶或意外、opportunity 机会都不能和 problems 对应，也不符合前后正负态度的转折。`, synonym: "disadvantages 与 problems 同向对应。" },
      { id: 55, part: "verb", answer: "forgotten", options: ["created", "forgotten", "understood", "identified"], clueType: "动作逻辑顺序、动作与名词的关系", clue: "problems / sit down to a big meal with friends and family", clueTargets: ["friends-family", "problems"], logic: `55题要让负态度名词 problems 在后半句中被扭转。once you sit down to a big meal with friends and family，和亲友坐下来吃大餐时，问题被抛在脑后，所以选 forgotten。
created 创造问题、understood 理解问题、identified 识别问题，都不能改变 problems 的负态度。坐下和亲友聚餐后，所有问题暂时被忘记，正好呼应全文温暖、家庭餐桌和善意的基调。`, synonym: "forgotten 与 friends and family / laughter and joy 的正向氛围呼应。" }
    ],
    sentenceData: [
      { en: `When I decided to buy a house in Europe ten years ago, I didn't think too long.`, zh: "十年前，当我决定在欧洲买房时，我没有犹豫太久。", html: `When I decided to <span data-clue="buy-house">buy a house in Europe</span> ten years ago, I didn't think too long.` },
      { en: `I liked traveling in France, but when it came to picking my favorite spot to settle, Italy was the clear winner.`, zh: "我喜欢在法国旅行，但是要选择一个最喜欢的地方定居时，意大利显然更胜一筹。", html: `I liked traveling in France, but when it came to picking my favorite spot to <button class="blank-token" data-qid="41">41</button>, Italy was the clear winner.` },
      { en: `During my first visit to Italy, I struggled to ask for directions or order in a restaurant.`, zh: "第一次到访意大利时，我在问路或在餐馆点餐时都感到很吃力。", html: `During my first visit to Italy, I <button class="blank-token" data-qid="42">42</button> to <span data-clue="ask-order">ask for directions or order in a restaurant</span>.` },
      { en: `But every time I tried to string a sentence of Italian together, the locals smiled at me and praised my language skills.`, zh: "但是每次我试着拼凑一句意大利语时，当地人都会对我微笑并夸赞我的语言能力。", html: `But every time I tried to <button class="blank-token" data-qid="43">43</button> a <span data-clue="sentence-italian">sentence of Italian together</span>, the <span data-clue="locals-smiled">locals smiled at me</span> and <button class="blank-token" data-qid="44">44</button> my language skills.` },
      { en: `That encouragement helped me to get through the language barrier.`, zh: "这种鼓励帮助我克服了语言障碍。", html: `That <span data-clue="encouragement">encouragement</span> helped me to get through the language <button class="blank-token" data-qid="45">45</button>.` },
      { en: `After I made Italy my permanent home, I discovered how warm-hearted Italians are.`, zh: "在我决定将意大利作为永久居住地后，我才发现意大利人是多么热情。", html: `After I made Italy my <span data-clue="permanent-home">permanent home</span>, I discovered how <button class="blank-token" data-qid="46">46</button> Italians are.` },
      { en: `Neighbors will bring me freshly made cheese and will come to my door to remind me to close the window in my car when rain is coming.`, zh: "邻居们会送来刚做好的奶酪，甚至在快要下雨时跑到我家门口提醒我关上车窗。", html: `Neighbors will <span data-clue="bring-cheese">bring me freshly made cheese</span> and will come to my door to <button class="blank-token" data-qid="47">47</button> me to <span data-clue="close-window">close the window in my car when rain is coming</span>.` },
      { en: `It's these small acts of kindness that make a new country feel like home.`, zh: "正是这些小小的善举，让一个陌生的国度变得像家一样。", html: `It's these small <button class="blank-token" data-qid="48">48</button> of <span data-clue="kindness">kindness</span> that make a new country feel like home.` },
      { en: `As a foodie, the way to my heart is through my stomach, and nowhere fuels my appetite quite like Italy.`, zh: "作为一个美食爱好者，想抓住我的心就要抓住我的胃，没有任何地方能像意大利一样调动我的食欲。", html: `As a <span data-clue="foodie">foodie</span>, the way to my heart is through my <span data-clue="stomach">stomach</span>, and nowhere fuels my <button class="blank-token" data-qid="49">49</button> quite like Italy.` },
      { en: `Each town has its own traditional dish, and every family keeps a recipe passed from one generation to another.`, zh: "每个城镇都有自己的传统菜肴，每个家庭都保存着代代相传的食谱。", html: `Each town has its own traditional <button class="blank-token" data-qid="50">50</button>, and every family keeps a <span data-clue="recipe">recipe passed from one generation to another</span>.` },
      { en: `Families gather for big meals on Sundays, birthdays, and whatever other excuses they can come up with.`, zh: "家庭成员常常在一起聚餐，无论是周日、生日，还是任何能找到的借口。", html: `Families <button class="blank-token" data-qid="51">51</button> for <span data-clue="big-meals">big meals</span> on Sundays, birthdays, and whatever other <span data-clue="excuses">excuses</span> they can <button class="blank-token" data-qid="52">52</button>.` },
      { en: `These meals are always accompanied by laughter and joy.`, zh: "这些聚餐总是充满欢声笑语。", html: `These meals are always <button class="blank-token" data-qid="53">53</button> by <span data-clue="laughter-joy">laughter and joy</span>.` },
      { en: `Whatever disadvantages life in Italy might have, the problems are forgotten once you sit down to a big meal with friends and family.`, zh: "尽管在意大利的生活可能有着种种缺点，但只要坐下来与朋友和家人共享一顿大餐，那些问题就会被抛在脑后。", html: `Whatever <button class="blank-token" data-qid="54">54</button> life in Italy might have, the <span data-clue="problems">problems</span> are <button class="blank-token" data-qid="55">55</button> once you sit down to a big meal with <span data-clue="friends-family">friends and family</span>.` }
    ],
    glossary: { study: "学习", rent: "租", visit: "参观；拜访", settle: "定居", planned: "计划", struggled: "吃力；挣扎", refused: "拒绝", happened: "碰巧", string: "拼凑", hang: "悬挂", mix: "混合", match: "匹配", improved: "改善", assessed: "评估", admired: "钦佩", praised: "表扬", course: "课程；过程", barrier: "障碍", area: "区域", test: "测试", "open-minded": "思想开放的", "strong-willed": "意志坚强的", "warm-hearted": "热心的", "well-informed": "消息灵通的", remind: "提醒", allow: "允许", persuade: "说服", order: "命令；点餐", tricks: "把戏", promises: "承诺", acts: "行为", duties: "职责", ambition: "抱负", success: "成功", appetite: "胃口", growth: "成长", costume: "服装", dish: "菜肴", symbol: "象征", tale: "故事", gather: "聚集", cheer: "欢呼", leave: "离开", wait: "等待", "put up with": "忍受", "stand up for": "支持；维护", "come up with": "想出", "make up for": "弥补", signaled: "示意", confirmed: "确认", represented: "代表", accompanied: "伴随", disadvantages: "不利之处", meanings: "意义", surprises: "惊喜", opportunities: "机会", created: "创造", forgotten: "被忘记", understood: "被理解", identified: "被识别", foodie: "美食爱好者", stomach: "胃", recipe: "食谱", kindness: "善意" }
  },
  "practice-4-2024-beijing": {
    title: "2024年北京卷｜音乐剧面试",
    source: "2024年北京卷",
    lead: "I'd just arrived at school, ready for another school day.",
    closing: "I realised that by trying something new, I can have fun—even if it means stepping out of my comfort zone.",
    notes: ["人物：Amy 和她的朋友、老师", "事件：Amy 因朋友鼓励参加音乐剧面试并获得主角", "环境：学校教室、戏剧教室、舞台表演", "主旨：尝试新事物能带来乐趣和勇气"],
    tone: "正确文章基调：从紧张不确定转向开心自信。首句是普通上学日，面试通知打破平静；结尾落到 trying something new 和 braver，说明主题是走出舒适区带来自信。",
    questions: [
      { id: 1, part: "noun", answer: "announcement", options: ["assignment", "initiative", "announcement", "interview"], clueType: "名词对应内容", clue: "Today at 1:10 there will be auditions", clueTargets: ["auditions-notice"], logic: `空格处名词对应的内容就是下一句引号里的句子：“Today at 1:10 there will be auditions for a musical.” 这是在通知某个时间将发生音乐剧面试，所以答案是 announcement。
assignment 指分配给某人必须完成的任务，如 school assignment；initiative 是倡议、新方案，指主动提出的行动或计划；interview 是采访或面试本身，不是“发布这个消息”的通知。
句中 I was reading ... when there was ... 还涉及过去进行时和一般过去时配合：过去进行时表示完整动作背景，一般过去时表示背景中突然发生的动作。作者正在读书时突然接到通知，reading 是背景，announcement 是突发动作。`, synonym: "announcement 与 Today at 1:10... 通知内容对应。" },
      { id: 2, part: "noun", answer: "interest", options: ["hesitancy", "interest", "worry", "regret"], clueType: "名词对应内容", clue: "but I'd try out because my friends were doing it", clueTargets: ["friends-doing"], logic: `抓住 but，这题就很清楚。but 后面是 I'd try out because my friends were doing it，作者愿意去参加选拔，是偏正态度；but 前面有 no，必须是否定一个正态度名词，才能形成负态度内容。
四个选项里只有 interest 是正态度。no interest in drama 表示“对戏剧没兴趣”，正好和后文“但朋友都去，所以我也试试”形成转折。hesitancy 犹豫、worry 担忧、regret 后悔本身就是负态度，和 no 结合后不能形成这里需要的转折逻辑。try out 表示参加选拔、试演，也值得积累。`, synonym: "no interest 与 because my friends were doing it 呼应。" },
      { id: 3, part: "noun", answer: "line", options: ["game", "show", "play", "line"], clueType: "名词对应内容", clue: "outside the drama room / Everyone looked energetic", clueTargets: ["outside-drama"], logic: `到了 1:10，戏剧教室外面聚集了等候面试的人。outside the drama room 和 Everyone looked energetic 共同构成候场场景，最自然对应 a line，也就是排队的人群。
game 比赛或游戏、show 演出、play 话剧都不能表示“在戏剧教室外等待面试的一队人”。`, synonym: "line 与 outside the room 候场对应。" },
      { id: 4, part: "connector", answer: "suddenly", options: ["suddenly", "continuously", "originally", "generally"], clueType: "副词描述动作状态", clue: "I hadn't expected / now that I was doing it / felt nervous", clueTargets: ["hadnt-expected", "felt-nervous"], logic: `副词描述 felt nervous 的状态。前文说 I hadn't expected I'd be standing there that morning，说明作者原本没想到自己会来；but now that I was doing it 表示真正置身其中，于是情绪发生转变。
正确答案是 suddenly，表示原本不紧张，这一刻突然紧张起来。continuously 表示持续紧张，但上文没有紧张线索；originally 表示起初如此、后来不同，和这里相反；generally 表示通常情况，用于总括性表述，不适合描写这一刻的心理突变。`, synonym: "suddenly 与 but / felt nervous 的心理突变对应。" },
      { id: 5, part: "verb", answer: "tested", options: ["advertised", "tested", "challenged", "polished"], clueType: "动作逻辑顺序、动作与名词的关系", clue: "say some lines / singing skills / what role", clueTargets: ["singing-skills", "auditions-notice"], logic: `结合前后一系列连续动作：进入教室、老师让我朗读台词、随后问我想演什么角色。面试过程中，老师对 my singing skills 做的动作只能是 tested，测试歌唱能力。
challenge 容易误选，但它偏“质疑、挑战”，面试是了解能力，不是老师质疑学生；polish 是打磨、润色，表示现场帮助我提升歌唱能力，这不是面试中该发生的动作；advertise 打广告、宣传，明显不合理。`, synonym: "tested 与 auditions / singing skills 同场。" },
      { id: 6, part: "noun", answer: "chance", options: ["demand", "credit", "dream", "chance"], clueType: "名词对应内容", clue: "teachers were smiling and praising me / A big role", clueTargets: ["smiling-praising"], logic: `老师 smiling and praising me，让作者觉得自己有了某种可能性，所以才敢说 A big role。能够连接“被夸奖”和“想要主要角色”的名词是 chance，机会、可能性。
demand 是要求，作者作为参加面试的人没有提出要求的资格；dream 是长期愿望，文中并没有她一直梦想演主角；credit 有信用、学分、赞扬等含义，但这里不能说“我觉得自己有了赞扬”，因为老师正在夸她，不是她拥有某种可用于争取角色的东西。`, synonym: "chance 与 praising / big role 呼应。" },
      { id: 7, part: "verb", answer: "posted", options: ["traded", "posted", "questioned", "claimed"], clueType: "动作逻辑顺序", clue: "cast list / checked / got the main role", clueTargets: ["cast-list"], logic: `was + 动词过去分词构成被动语态。cast list 被怎样之后，朋友们才能 checked 并回来告诉作者“你拿到主角了”？当然是名单被 posted，张贴或公布出来。
traded 涉及交易买卖；questioned 是质疑、质问，负态度且和名单不搭；claimed 是声称、宣称，通常指某人坚持自己的说法，不能和 cast list 构成这里的连续动作。`, synonym: "posted 与 cast list / checked 对应。" },
      { id: 8, part: "verb", answer: "well up", options: ["well up", "roll in", "stand out", "go off"], clueType: "动作逻辑顺序", clue: "my name was at the top / I was so happy", clueTargets: ["so-happy"], logic: `作者看到 my name was at the top，又说 I was so happy，前后是强烈喜悦情绪。能表达这种情绪涌动、眼泪涌出的短语是 well up。
roll in 表示大量涌入，如申请、善款、游客等；stand out 表示脱颖而出或引人注目；go off 可表示爆炸、警报响起、变质或失去兴趣，在高考里常见的是闹钟响起。它们都不能描述作者看到名单后的情绪反应。`, synonym: "well up 与 so happy 情绪强烈对应。" },
      { id: 9, part: "verb", answer: "clapping", options: ["whispering", "arguing", "clapping", "stretching"], clueType: "动作逻辑顺序", clue: "on stage / gave me a boost of confidence", clueTargets: ["on-stage", "confidence"], logic: `观众开始做某事后，that gave me a boost of confidence。舞台表演中最能提升演员信心的观众反馈是 clapping，鼓掌。
whispering 是低声私语，arguing 是争论，如果观众这样做，作者很难获得信心；stretching 是伸展，观众在台下伸懒腰或做伸展动作也无法给作者信心。clap 的现在分词要双写 p，applaud 和 applause 也可以一起积累。`, synonym: "clapping 与 boost of confidence 对应。" },
      { id: 10, part: "adjective", answer: "braver", options: ["funnier", "fairer", "cleverer", "braver"], clueType: "形容词描述人物特点", clue: "trying something new / stepping out of my comfort zone", clueTargets: ["trying-new", "comfort-zone"], logic: `比较级表示作者某种特质增强。结尾说 by trying something new 和 stepping out of my comfort zone，主题是尝试新事物、走出舒适区，所以作者变得 braver，更勇敢。
funnier 搞笑的、fairer 公平的、cleverer 聪明的，都不是这篇文章中作者成长的方向。完形最后一题往往回扣主题，这里 braver 正好对应全文从“没兴趣、紧张”到“敢于尝试”的变化。`, synonym: "braver 与 trying something new / comfort zone 呼应。" }
    ],
    sentenceData: [
      { en: `I'd just arrived at school, ready for another school day.`, zh: "我刚刚到学校，准备迎接普通的一天。", html: `I'd just arrived at school, ready for another school day.` },
      { en: `I was reading a book in the classroom when there was an announcement.`, zh: "我在教室里读书时忽然接到了一则通知。", html: `I was reading a book in the classroom when there was an <button class="blank-token" data-qid="1">1</button>.` },
      { en: `Today at 1:10 there will be auditions for a musical.`, zh: "今天一点十分将进行音乐剧面试。", html: `<span data-clue="auditions-notice">Today at 1:10 there will be auditions for a musical</span>.` },
      { en: `My friends all jumped up in excitement and asked me, Will you be going, Amy?`, zh: "我的朋友们都兴奋地跳了起来，并问我：“艾米，你会去吗？”", html: `My friends all jumped up in excitement and asked me, Will you be going, Amy?` },
      { en: `Sure, I said. I had no interest in drama, but I'd try out because my friends were doing it.`, zh: "“当然了。”我说。我对戏剧没什么兴趣，但是因为朋友们要去参加，所以我也想去试试。", html: `Sure, I said. I had no <button class="blank-token" data-qid="2">2</button> in drama, but I'd try out because <span data-clue="friends-doing">my friends were doing it</span>.` },
      { en: `At 1:10, there was a line outside the drama room.`, zh: "一点十分的时候，戏剧教室外面已经排起了长队。", html: `At 1:10, there was a <button class="blank-token" data-qid="3">3</button> <span data-clue="outside-drama">outside the drama room</span>.` },
      { en: `Everyone looked energetic. I hadn't expected I'd be standing there that morning.`, zh: "每个人看起来都精力充沛。我原本没想到那天早上自己会站在那里。", html: `Everyone looked energetic. I <span data-clue="hadnt-expected">hadn't expected I'd be standing there that morning</span>.` },
      { en: `But now that I was doing it, I suddenly felt nervous.`, zh: "但是既然已经来了，我突然觉得有些紧张。", html: `But now that I was doing it, I <button class="blank-token" data-qid="4">4</button> <span data-clue="felt-nervous">felt nervous</span>.` },
      { en: `What if I wasn't any good?`, zh: "我要是表现得不好该怎么办？", html: `What if I wasn't any good?` },
      { en: `I entered the room and the teachers made me say some lines from the musical.`, zh: "我走进教室后，老师们让我朗读音乐剧中的一些台词。", html: `I entered the room and the teachers made me say some lines from the musical.` },
      { en: `They then tested my singing skills and asked what role I wanted to play.`, zh: "然后他们测试了我的歌唱能力，还问我想扮演什么角色。", html: `They then <button class="blank-token" data-qid="5">5</button> my <span data-clue="singing-skills">singing skills</span> and asked what role I wanted to play.` },
      { en: `The teachers were smiling and praising me.`, zh: "老师们都在微笑并且夸奖我。", html: `The teachers were <span data-clue="smiling-praising">smiling and praising me</span>.` },
      { en: `I felt like I had a chance, so I said, A big role.`, zh: "我觉得自己有机会，于是我说：“一个主要角色。”", html: `I felt like I had a <button class="blank-token" data-qid="6">6</button>, so I said, A big role.` },
      { en: `They said they'd look into it. I started getting really nervous.`, zh: "他们说他们会考虑。我开始变得非常紧张。", html: `They said they'd look into it. I started getting really nervous.` },
      { en: `Soon, the cast list was posted.`, zh: "很快，演员名单贴出来了。", html: `Soon, the <span data-clue="cast-list">cast list</span> was <button class="blank-token" data-qid="7">7</button>.` },
      { en: `My friends checked and came back shouting, Amy, you got the main role!`, zh: "我的朋友们看过后回来喊道：“艾米，你拿到主角了！”", html: `My friends checked and came back shouting, Amy, you got the main role!` },
      { en: `Sure enough, my name was at the top.`, zh: "果然，我的名字在最上面。", html: `Sure enough, my name was at the top.` },
      { en: `I just stared at it and started to well up. I was so happy.`, zh: "我盯着名单，眼眶湿润了。我非常开心。", html: `I just stared at it and started to <button class="blank-token" data-qid="8">8</button>. I was <span data-clue="so-happy">so happy</span>.` },
      { en: `After two months we were all prepared and ready to go on stage.`, zh: "两个月后，我们所有人都做好了登台表演的准备。", html: `After two months we were all prepared and ready to go <span data-clue="on-stage">on stage</span>.` },
      { en: `It was fun. And when people started clapping, that gave me a boost of confidence.`, zh: "演出很有趣。当人们开始鼓掌时，我的信心得到了巨大的提升。", html: `It was fun. And when people started <button class="blank-token" data-qid="9">9</button>, that gave me a boost of <span data-clue="confidence">confidence</span>.` },
      { en: `It stayed with me and made me feel braver.`, zh: "这种信心一直伴随着我，让我感觉更勇敢。", html: `It stayed with me and made me feel <button class="blank-token" data-qid="10">10</button>.` },
      { en: `I realised that by trying something new, I can have fun-even if it means stepping out of my comfort zone.`, zh: "我意识到，通过尝试新事物，我可以得到很多乐趣，即使这意味着要走出自己的舒适区。", html: `I realised that by <span data-clue="trying-new">trying something new</span>, I can have fun-even if it means <span data-clue="comfort-zone">stepping out of my comfort zone</span>.` }
    ],
    glossary: { assignment: "任务", initiative: "主动性", announcement: "通知", interview: "面试", hesitancy: "犹豫", interest: "兴趣", worry: "担心", regret: "后悔", game: "游戏", show: "演出", play: "戏剧", line: "队伍", suddenly: "突然", continuously: "持续地", originally: "原本", generally: "通常", advertised: "宣传", tested: "测试", challenged: "挑战", polished: "打磨；润色", demand: "需求", credit: "功劳", dream: "梦想", chance: "机会", traded: "交易", posted: "张贴", questioned: "质疑", claimed: "声称", "well up": "涌出；热泪盈眶", "roll in": "滚滚而来", "stand out": "突出", "go off": "离开；爆炸", whispering: "低语", arguing: "争吵", clapping: "鼓掌", stretching: "伸展", funnier: "更有趣的", fairer: "更公平的", cleverer: "更聪明的", braver: "更勇敢的", auditions: "面试；试演", musical: "音乐剧", drama: "戏剧", energetic: "精力充沛的", nervous: "紧张的", role: "角色", confidence: "信心", comfort: "舒适" }
  }
};

let questions = articleData["mock-2026-sunflower-farm"].questions;
let sentenceData = articleData["mock-2026-sunflower-farm"].sentenceData;
let glossary = articleData["mock-2026-sunflower-farm"].glossary;

const macroBtn = document.querySelector("#unlockBtn");
const articleLibraryEl = document.querySelector("#articleLibrary");
const trainingWorkspace = document.querySelector("#trainingWorkspace");
const macroHint = document.querySelector("#macroHint");
const macroEcho = document.querySelector("#macroEcho");
const drillModule = document.querySelector("#drill");
const unlockState = document.querySelector("#unlockState");
const standardTone = document.querySelector("#standardTone");
const clozeArticle = document.querySelector("#clozeArticle");
const readingArticle = document.querySelector("#readingArticle");
const allOptions = document.querySelector("#allOptions");
const activeBlankState = document.querySelector("#activeBlankState");
const analysisQuestion = document.querySelector("#analysisQuestion");
const analysisContent = document.querySelector("#analysisContent");
const lookupTitle = document.querySelector("#lookupTitle");
const lookupContent = document.querySelector("#lookupContent");
const mistakeList = document.querySelector("#mistakeList");
const refreshMistakesBtn = document.querySelector("#refreshMistakesBtn");
const printPdfBtn = document.querySelector("#printPdfBtn");
const loginForm = document.querySelector("#loginForm");
const loginCodeInput = document.querySelector("#loginCodeInput");
const loginError = document.querySelector("#loginError");

function unlockApp() {
  document.body.classList.remove("auth-locked");
  document.body.classList.add("auth-ready");
}

function normalizeLoginCode(value) {
  return value.trim().toUpperCase();
}

if (localStorage.getItem("clozeLoginOk") === "1") {
  unlockApp();
}

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const code = normalizeLoginCode(loginCodeInput.value);
  if (loginCodes.includes(code)) {
    localStorage.setItem("clozeLoginOk", "1");
    loginError.textContent = "";
    unlockApp();
    return;
  }
  loginError.textContent = "登录码不正确，请重新输入。";
  loginCodeInput.select();
});

function loadArticle(articleId) {
  const data = articleData[articleId];
  if (!data) return false;
  currentArticleId = articleId;
  questions = data.questions;
  sentenceData = data.sentenceData;
  glossary = data.glossary;
  answers.clear();
  selectedParts.clear();
  activeQuestionId = null;
  document.querySelector('.first-sentence-card .passage-toolbar strong').textContent = data.title;
  document.querySelector('.lead-sentence mark').textContent = data.lead;
  document.querySelector('.closing-sentence mark').textContent = data.closing;
  document.querySelector('.first-sentence-notes').innerHTML = data.notes.map((note) => `<span>${note}</span>`).join('');
  document.querySelector('#standardTone p').textContent = data.tone;
  document.querySelector('#standardTone').hidden = true;
  document.querySelector('#macroHint').textContent = '请选择文章走向。';
  document.querySelector('#macroHint').style.color = '#647084';
  document.querySelector('#unlockState').textContent = '待定调';
  document.querySelector('#unlockState').style.background = '#fff3d8';
  document.querySelector('#unlockState').style.color = '#a76605';
  document.querySelector('#analysisQuestion').textContent = '未选空';
  document.querySelector('#analysisContent').innerHTML = '<p>点击左侧任意空格开始。</p>';
  document.querySelector('#activeBlankState').textContent = '点击任意空';
  document.querySelector('#lookupTitle').textContent = '词句翻译';
  document.querySelector('#lookupContent').innerHTML = '<p>点击任意收录词汇，或双击任意句子。</p>';
  document.querySelector('#mistakeList').textContent = '还没有作答记录。';
  drillModule.classList.add('locked');
  renderArticles();
  return true;
}

function renderArticles() {
  clozeArticle.innerHTML = sentenceData.map((sentence) => `<p class="sentence">${sentence.html}</p>`).join("");
  readingArticle.innerHTML = sentenceData.map((sentence, index) => {
    return `<p class="sentence" data-sentence="${index}">${wordify(sentence.en)}</p>`;
  }).join("");
  allOptions.innerHTML = questions.map((question) => {
    return `<section class="option-line"><strong>${question.id}</strong>${question.options.map((option, index) => `<button class="word-token option-word" type="button" data-word="${option.toLowerCase()}"><b>${optionLabels[index]}.</b> ${option}</button>`).join("")}</section>`;
  }).join("");
  restoreAnsweredBlanks();
}

function restoreAnsweredBlanks() {
  answers.forEach((_, id) => {
    document.querySelectorAll(`.blank-token[data-qid="${id}"]`).forEach((item) => item.classList.add("answered"));
  });
}

function renderArticleLibrary() {
  articleLibraryEl.innerHTML = articleLibrary.map((article) => {
    const done = articleProgress.get(article.id) === "completed";
    const pending = article.status === "pending";
    return `<button class="article-card ${done ? "completed" : ""} ${pending ? "pending" : ""}" type="button" data-article-id="${article.id}">
      <span class="source-tag">${article.source}</span>
      <strong>${article.title}</strong>
      <p>${article.summary}</p>
      <em>${pending ? "待录入" : done ? "已完成" : "未完成"}</em>
    </button>`;
  }).join("");
}

articleLibraryEl.addEventListener("click", (event) => {
  const card = event.target.closest("[data-article-id]");
  if (!card) return;
  const selectedId = card.dataset.articleId;
  const article = articleLibrary.find((item) => item.id === selectedId);
  if (article?.status === "pending") {
    card.classList.add("shake");
    setTimeout(() => card.classList.remove("shake"), 420);
    return;
  }
  if (!loadArticle(selectedId)) return;
  trainingWorkspace.classList.remove("hidden");
  document.querySelector("#macro").scrollIntoView({ behavior: "smooth", block: "start" });
});

function wordify(text) {
  return text.replace(/[A-Za-z'-]+/g, (word) => {
    const key = word.toLowerCase().replace(/'s$/, "");
    const lookup = glossary[key] ? key : key;
    return `<button class="word-token" type="button" data-word="${lookup}">${word}</button>`;
  });
}

document.querySelectorAll("[data-choice-group]").forEach((group) => {
  group.addEventListener("click", (event) => {
    const button = event.target.closest("[data-choice]");
    if (!button) return;
    group.querySelectorAll("[data-choice]").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    choices[group.dataset.choiceGroup] = button.dataset.choice;
  });
});

macroBtn.addEventListener("click", () => {
  if (!choices.trend) {
    macroHint.textContent = "请先选择文章走向。";
    macroHint.style.color = "#b33339";
    return;
  }
  drillModule.classList.remove("locked");
  unlockState.textContent = "已解锁";
  unlockState.style.background = "#e7f7ef";
  unlockState.style.color = "#12715b";
  macroHint.textContent = `你的选择：${choices.trend}。标准基调见下方。`;
  macroHint.style.color = "#12715b";
  standardTone.hidden = false;
  macroEcho.textContent = macroHint.textContent;
});

clozeArticle.addEventListener("click", (event) => {
  const blank = event.target.closest("[data-qid]");
  if (!blank) return;
  activeQuestionId = Number(blank.dataset.qid);
  document.querySelectorAll(".blank-token").forEach((item) => item.classList.remove("active"));
  document.querySelectorAll(`.blank-token[data-qid="${activeQuestionId}"]`).forEach((item) => item.classList.add("active"));
  clearClues();
  renderAnalysis(activeQuestionId);
});

analysisContent.addEventListener("click", (event) => {
  const partButton = event.target.closest("[data-part]");
  const answerButton = event.target.closest("[data-answer]");
  if (partButton) selectPart(partButton);
  if (answerButton) selectAnswer(answerButton);
});

function formatAnalysisText(text) {
  return String(text)
    .split(/\n+/)
    .map((line) => `<p>${line}</p>`)
    .join("");
}

function renderAnalysis(id) {
  const question = questions.find((item) => item.id === id);
  const chosenPart = selectedParts.get(id);
  const chosenAnswer = answers.get(id);
  activeBlankState.textContent = `正在分析 ${id}`;
  analysisQuestion.textContent = `第 ${id} 空`;
  analysisContent.innerHTML = `
    <section class="step-card">
      <h4>1. 全部选项</h4>
      <div class="options-row">
        ${question.options.map((option, index) => `<span class="option-pill"><b>${optionLabels[index]}.</b> ${option}</span>`).join("")}
      </div>
    </section>
    <section class="step-card">
      <h4>2. 选择词性</h4>
      <div class="choice-row">
        ${Object.entries(partLabels).map(([key, label]) => `<button class="step-action ${chosenPart === key ? "selected" : ""}" type="button" data-part="${key}">${label}</button>`).join("")}
      </div>
    </section>
    <section class="step-card muted-step" id="autoClue">
      <h4>3. 线索</h4>
      ${chosenPart ? `<p><strong>${question.clueType}</strong>：${question.clue}</p>` : "<p>选择词性后自动显示，并同步高亮原文。</p>"}
    </section>
    <section class="step-card muted-step" id="answerPick">
      <h4>4. 选择答案</h4>
      ${chosenPart ? renderAnswerButtons(question, chosenAnswer) : "<p>先完成词性判断。</p>"}
    </section>
    <section class="step-card muted-step" id="thinkingAnalysis">
      <h4>5. 思路解析</h4>
      ${chosenPart ? formatAnalysisText(question.logic) : "<p>先完成词性判断，再查看完整解析。</p>"}
    </section>
  `;
  if (chosenPart) highlightClues(question);
}

function renderAnswerButtons(question, chosenAnswer = "") {
  const buttons = question.options.map((option, index) => {
    const picked = chosenAnswer === option;
    const correctness = picked ? (option === question.answer ? " correct" : " wrong") : "";
    return `<button class="option-btn ${picked ? "selected" : ""}${correctness}" type="button" data-answer="${option}">${optionLabels[index]}. ${option}</button>`;
  }).join("");
  const feedback = chosenAnswer
    ? `<div class="feedback ${chosenAnswer === question.answer ? "" : "warning"}">${chosenAnswer === question.answer ? "已完成：回答正确。" : `已完成：你选 ${chosenAnswer}，答案是 ${question.answer}。`}</div>`
    : "";
  return `<div class="options-row">${buttons}</div>${feedback}`;
}

function selectPart(button) {
  const question = questions.find((item) => item.id === activeQuestionId);
  selectedParts.set(question.id, button.dataset.part);
  analysisContent.querySelectorAll("[data-part]").forEach((item) => item.classList.remove("selected"));
  button.classList.add("selected");
  highlightClues(question);
  document.querySelector("#autoClue").innerHTML = `
    <h4>3. 线索</h4>
    <p><strong>${question.clueType}</strong>：${question.clue}</p>
  `;
  document.querySelector("#answerPick").innerHTML = `
    <h4>4. 选择答案</h4>
    ${renderAnswerButtons(question, answers.get(question.id))}
  `;
  document.querySelector("#thinkingAnalysis").innerHTML = `
    <h4>5. 思路解析</h4>
    ${formatAnalysisText(question.logic)}
  `;
}

function selectAnswer(button) {
  const question = questions.find((item) => item.id === activeQuestionId);
  answers.set(question.id, button.dataset.answer);
  analysisContent.querySelectorAll("[data-answer]").forEach((item) => item.classList.remove("selected", "correct", "wrong"));
  button.classList.add("selected");
  const correct = button.dataset.answer === question.answer;
  button.classList.add(correct ? "correct" : "wrong");
  const old = document.querySelector("#answerPick .feedback");
  if (old) old.remove();
  const result = document.createElement("div");
  result.className = `feedback ${correct ? "" : "warning"}`;
  result.textContent = correct ? "正确：有明确原文提示。" : `暂不通过：答案是 ${question.answer}，请回看高亮线索。`;
  document.querySelector("#answerPick").append(result);
  document.querySelectorAll(`.blank-token[data-qid="${question.id}"]`).forEach((item) => item.classList.add("answered"));
  updateArticleProgress();
  refreshMistakes();
}

function updateArticleProgress() {
  const allCorrect = questions.every((question) => answers.get(question.id) === question.answer);
  if (!allCorrect) return;
  articleProgress.set(currentArticleId, "completed");
  renderArticleLibrary();
}

function clearClues() {
  document.querySelectorAll("[data-clue]").forEach((item) => item.classList.remove("clue-hit"));
}

function highlightClues(question) {
  clearClues();
  question.clueTargets.forEach((target) => {
    document.querySelectorAll(`[data-clue="${target}"]`).forEach((item) => item.classList.add("clue-hit"));
  });
}

readingArticle.addEventListener("click", (event) => {
  const word = event.target.closest("[data-word]");
  if (!word) return;
  showWordLookup(word);
});

allOptions.addEventListener("click", (event) => {
  const word = event.target.closest("[data-word]");
  if (!word) return;
  showWordLookup(word);
});

function showWordLookup(word) {
  const key = word.dataset.word;
  lookupTitle.textContent = word.textContent;
  lookupContent.innerHTML = `<p><strong>${word.textContent}</strong>：${glossary[key] || "词库暂未收录"}</p>`;
}

readingArticle.addEventListener("dblclick", (event) => {
  const sentence = event.target.closest("[data-sentence]");
  if (!sentence) return;
  const item = sentenceData[Number(sentence.dataset.sentence)];
  lookupTitle.textContent = "句子翻译";
  lookupContent.innerHTML = `<p>${item.en}</p><p><strong>${item.zh}</strong></p>`;
});

refreshMistakesBtn.addEventListener("click", refreshMistakes);
printPdfBtn.addEventListener("click", printReviewPdf);

mistakeList.addEventListener("click", (event) => {
  const button = event.target.closest(".step-action");
  if (!button) return;
  const card = button.closest(".mistake-card");
  card.querySelectorAll(".step-action").forEach((item) => item.classList.remove("selected"));
  button.classList.add("selected");
});

function refreshMistakes() {
  const mistakes = questions.filter((question) => answers.has(question.id) && answers.get(question.id) !== question.answer);
  if (!answers.size) {
    mistakeList.textContent = "还没有作答记录。";
    return;
  }
  if (!mistakes.length) {
    mistakeList.innerHTML = "<p class=\"feedback\">当前已作答题目全部正确。</p>";
    return;
  }
  mistakeList.innerHTML = mistakes.map((question) => {
    return `<article class="mistake-card">
      <strong>${question.id} 题：你选 ${answers.get(question.id)}，答案 ${question.answer}</strong>
      <p>${question.logic}</p>
      <div class="choice-row">
        <button class="step-action" type="button">单词不认识</button>
        <button class="step-action" type="button">没找提示词</button>
        <button class="step-action" type="button">自己脑补</button>
        <button class="step-action" type="button">词性误判</button>
      </div>
    </article>`;
  }).join("");
}

function printReviewPdf() {
  const data = articleData[currentArticleId];
  if (!data) return;
  const escapePrintHtml = (value) => String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
  const printAnalysisText = (text) => String(text)
    .split(/\n+/)
    .map((line) => `<p>${escapePrintHtml(line)}</p>`)
    .join("");
  const articleWithBlanks = sentenceData.map((sentence) => {
    const html = sentence.html
      .replace(/<button class="blank-token" data-qid="(\d+)">\d+<\/button>/g, '<span class="print-blank">($1) ____</span>')
      .replace(/<span data-clue="[^"]+">([^<]*)<\/span>/g, "$1");
    return `<p>${html}</p>`;
  }).join("");
  const optionRows = questions.map((question) => {
    const options = question.options
      .map((option, index) => `<span><strong>${optionLabels[index]}.</strong> ${escapePrintHtml(option)}</span>`)
      .join("");
    return `<section class="print-question">
      <h3>${question.id} 题</h3>
      <div class="print-options">${options}</div>
    </section>`;
  }).join("");
  const analysisRows = questions.map((question) => {
    const chosen = answers.get(question.id) || "未作答";
    const correct = chosen === question.answer;
    return `<section class="print-question ${correct ? "" : "print-wrong"}">
      <h3>${question.id} 题解析</h3>
      <p><strong>考点：</strong>${escapePrintHtml(question.clueType)}</p>
      <p><strong>线索：</strong>${escapePrintHtml(question.clue)}</p>
      <p><strong>你的答案：</strong>${escapePrintHtml(chosen)}　<strong>标准答案：</strong>${escapePrintHtml(question.answer)}</p>
      <div><strong>思路解析：</strong>${printAnalysisText(question.logic)}</div>
    </section>`;
  }).join("");
  const win = window.open("", "_blank");
  win.document.write(`<!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <title>${data.source} - 复盘打印</title>
      <style>
        body { font-family: Arial, "Microsoft YaHei", sans-serif; color: #111827; line-height: 1.65; padding: 28px; }
        h1 { font-size: 24px; margin: 0 0 8px; }
        h2 { font-size: 18px; margin: 24px 0 10px; border-bottom: 1px solid #d1d5db; padding-bottom: 6px; }
        h3 { font-size: 15px; margin: 0 0 6px; }
        p { margin: 4px 0; }
        .meta { color: #4b5563; margin-bottom: 18px; }
        .article { background: #f9fafb; border: 1px solid #e5e7eb; padding: 12px; border-radius: 6px; }
        .article p { margin: 0 0 10px; }
        .print-blank { display: inline-block; min-width: 74px; font-weight: 700; color: #111827; }
        .print-question { break-inside: avoid; border: 1px solid #e5e7eb; border-radius: 6px; padding: 10px; margin: 10px 0; }
        .print-options { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px 14px; }
        .print-options span { font-size: 14px; }
        .print-wrong { border-color: #fca5a5; background: #fff7f7; }
        .answer-section { break-before: page; }
        @media print { body { padding: 0; } button { display: none; } }
      </style>
    </head>
    <body>
      <h1>${data.title}</h1>
      <p class="meta">${data.source}</p>
      <h2>完整题目</h2>
      <div class="article">${articleWithBlanks}</div>
      <h2>选项</h2>
      ${optionRows}
      <h2 class="answer-section">逐题解析</h2>
      ${analysisRows}
      <script>window.onload = () => window.print();</script>
    </body>
    </html>`);
  win.document.close();
}

loadArticle(currentArticleId);
renderArticleLibrary();

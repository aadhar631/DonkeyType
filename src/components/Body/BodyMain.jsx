import { useState, useEffect, useCallback, useRef } from 'react'
import { TiWorld } from "react-icons/ti";
import { IoMdRefresh } from "react-icons/io";

const wordParagraphs = [
    "A forest lush with greenery, teeming with life, and resonating with the chirping of birds and rustling of leaves is a sanctuary for nature lovers. Hiking trails wind through the dense foliage, revealing hidden clearings and babbling brooks.",
    "The meandering river flows gently, reflecting the azure sky above. Trees stand tall, their branches forming a natural canopy that filters sunlight, creating a serene ambiance below.",
    "In the heart of the wilderness, flora and fauna coexist in perfect harmony. Deer graze peacefully in the meadows, while squirrels dart between branches, collecting nuts for the approaching winter.",
    "Moss-covered rocks line the riverbanks, and wildflowers add vibrant splashes of color to the landscape. Nature's palette is on full display, showcasing hues of green, brown, and the occasional burst of red or purple.",
    "The air is filled with the sweet scent of blooming flowers and the earthy aroma of the forest floor. Each step on the soft soil is a connection to the ancient rhythm of nature, a dance that has played out for centuries.",
    "Birdsong becomes a symphony, with different species contributing their unique melodies. The harmony of the natural world is a soothing balm for the weary soul, offering a retreat from the hustle and bustle of modern life.",
    "As the sun sets, the forest transforms into a magical realm. Fireflies twinkle like stars, and the night is alive with the calls of nocturnal creatures. The moonlight filters through the trees, casting enchanting shadows on the ground.",
    "For those who seek solace in the embrace of nature, the forest is a sanctuary that provides not only beauty but also a profound sense of connection to the planet we call home.",
    "The ancient oak trees, with their gnarled branches and thick trunks, stand as silent witnesses to the passage of time. Each ring within their bark tells a story, a chronicle of years gone by.",
    "The whispering wind carries tales of the past, and the leaves that carpet the forest floor are like pages from a forgotten book. Nature is a storyteller, and those who listen can hear the echoes of bygone eras.",
    "Mushrooms dot the landscape, their caps displaying an array of shapes and colors. They are like tiny sentinels, guardians of the secrets hidden beneath the soil.",
    "Rays of sunlight filter through the canopy, creating dappled patterns on the ground. It's a dance of light and shadow, a visual symphony that unfolds with the changing angles of the sun.",
    "A babbling brook meanders through the heart of the forest, its crystal-clear waters reflecting the surrounding greenery. Stones beneath the surface form a mosaic, and aquatic plants sway gently in the current.",
    "The forest beckons explorers to wander its winding trails, to discover the wonders that lie hidden around every bend. It is a place of mystery and discovery, where the curious are rewarded with glimpses of nature's marvels.",
    "In the stillness of dawn, the forest is draped in a delicate mist. The world awakens with the soft rustle of leaves and the first calls of awakening birds.",
    "As the day progresses, the forest comes alive with activity. Squirrels scurry up tree trunks, and birds flit from branch to branch, their feathers creating flashes of color against the green backdrop.",
    "Wildflowers carpet the meadows, creating a patchwork quilt of colors. Bees buzz from blossom to blossom, collecting nectar to sustain their hive.",
    "The canopy above is a mosaic of leaves, filtering the sunlight into a gentle, golden glow. It's a cathedral of nature, where every rustle and chirp is a hymn to the beauty of the world.",
    "At twilight, the forest takes on a different character. Shadows lengthen, and the symphony of daytime gives way to the nocturnal serenade. Owls hoot in the distance, and the moon casts an ethereal glow.",
    "Under the moonlight, the forest becomes a realm of dreams. Creatures of the night emerge from their hiding places, adding an air of enchantment to the already magical landscape.",
    "The rustling leaves and the croaking of frogs create a lullaby that serenades the forest to sleep. It's a timeless cycle, a dance of nature that continues unabated.",
    "The stars twinkle overhead, and the forest, now bathed in moonlight, is a tranquil sanctuary. It's a place where the beauty of the natural world takes center stage, inviting all who enter to become part of its timeless story.",
    "A stroll through this enchanted forest is a journey through time, a communion with the earth's ancient spirit. It's a reminder that, in the midst of our modern lives, the heartbeat of nature continues to echo, steady and enduring.",
    "As the sun rises once more, casting its warm rays upon the treetops, the forest awakens to a new day. The cycle begins anew, and the symphony of nature plays on.",
    "The rustle of leaves, the call of distant birds, and the gentle gurgle of the brook create a soundtrack that accompanies every step. It's a melody that speaks to the soul, a song of the wild.",
    "Among the towering trees and the vibrant undergrowth, every creature plays a role in the intricate tapestry of life. From the smallest insects to the majestic deer, each contributes to the harmony of the ecosystem.",
    "The forest, with its myriad shades of green and the soft carpet of fallen leaves, is a sanctuary for contemplation. It's a place where the mind finds respite from the noise of the world, and the heart beats in sync with the rhythm of nature.",
    "Moss-covered rocks, adorned with delicate ferns, add to the enchantment. They are like stepping stones in a magical realm, inviting explorers to traverse the landscape with wonder-filled eyes.",
    "The air is cool and crisp, scented with the fragrance of pine and earth. It's a perfume that lingers in the memory, a reminder of the simple joys found in the embrace of the great outdoors.",
    "The forest floor, with its patches of sunlight and shadows, is a canvas for the intricate dance of life. Insects scuttle about, and the occasional rustle betrays the presence of unseen creatures.",
    "As the day draws to a close, the canopy above becomes a canvas painted with the hues of sunset. It's a breathtaking display, a celebration of nature's artistry that leaves observers in awe.",
    "Underneath the fading light, nocturnal creatures begin their nightly rituals. The forest, now draped in a cloak of darkness, takes on an air of mystery and intrigue.",
    "The hoot of an owl and the distant howl of a wolf add to the symphony of the night. It's a reminder that, even in the stillness, the forest is very much alive.",
    "As the stars emerge in the velvet sky, the forest becomes a celestial theater. The Milky Way stretches across the heavens, and constellations tell stories written in the stars.",
    "In this nocturnal wonderland, the rustling leaves and the gentle murmur of the brook create a soothing lullaby. It's a melody that serenades the forest to sleep, wrapping it in a blanket of tranquility.",
    "With each passing moment, the forest undergoes a subtle transformation. The night unfolds its mysteries, and the ancient trees stand as silent sentinels, guardians of the secrets held within their gnarled bark.",
    "The cycle repeats, a timeless dance that has played out for eons. The forest, with its ever-changing tapestry of life, remains a sanctuary for those who seek solace in the embrace of nature.",
    "As dawn breaks once more, painting the sky in shades of pink and gold, the forest awakens to a new day. The symphony begins anew, and the dance of life continues in this enchanted realm.",
    "With each step through the forest, a profound connection to the natural world is forged. It's a pilgrimage to a sacred space where the spirit finds renewal and the soul finds its song.",
    "The forest, with its towering trees and delicate ferns, is a cathedral of green. Sunlight filters through the leaves, creating a soft glow that bathes the surroundings in a warm embrace.",
    "Trails wind through the undergrowth, inviting exploration. Each bend in the path reveals new wonders, from hidden clearings bathed in sunlight to secluded groves where time seems to stand still.",
    "The scent of earth and moss permeates the air, grounding those who venture into this sanctuary. It's an aroma that speaks of the earth's ancient wisdom, a fragrance that whispers of the cycles of life.",
    "As the wind rustles through the leaves, it carries with it the stories of the forest. It's a storyteller that weaves tales of seasons past, of creatures that roamed, and of the ever-changing landscape.",
    "In the heart of the forest, a tranquil pond reflects the surrounding greenery. Lily pads float on the water's surface, and dragonflies flit about, their iridescent wings catching the sunlight.",
    "The pond is a mirror, capturing the essence of the forest in its still waters. It's a place of reflection, both literally and metaphorically, where the mind can ponder the mysteries of existence.",
    "As day turns to night, the pond becomes a celestial canvas. Stars overhead are mirrored in the water below, creating a dreamscape that blurs the boundaries between earth and sky.",
    "Frogs add their voices to the nocturnal chorus, their croaks creating a rhythmic melody. It's a serenade that lulls the forest to sleep, a lullaby sung by the denizens of the night.",
    "Under the moon's gentle glow, the forest takes on a mystical aura. Shadows dance, and the night is alive with the enchantment of the unseen. It's a realm where imagination takes flight.",
    "In the heart of the forest, a towering waterfall cascades down moss-covered rocks. The sound of rushing water is a symphony that echoes through the trees, a melody that resonates with the power of nature.",
    "Mist rises from the base of the waterfall, creating an ethereal veil that shrouds the surroundings. It's a place of raw beauty, where the elements converge to form a breathtaking tableau.",
    "Rainbows dance in the mist, adding a touch of magic to the scene. It's a fleeting moment of brilliance, a reminder that even in the midst of the wild, nature is an artist that paints with a vibrant palette.",
    "Surrounding the waterfall, ferns and moss thrive in the perpetual moisture. They are like nature's tapestry, weaving green threads into the fabric of the landscape.",
    "The air is charged with negative ions, invigorating those who stand in the waterfall's embrace. It's a sensory experience that goes beyond sight and sound, a baptism in the energy of the natural world.",
    "In the heart of the forest, ancient ruins lie hidden among the trees. Weathered stones bear the marks of time, and moss-covered pillars stand as silent sentinels to a forgotten era.",
    "Nature has reclaimed these remnants, intertwining with the stones in a dance of decay and renewal. Vines creep up the walls, and the echoes of the past linger in the air.",
    "The ruins tell a story of a civilization long gone, leaving behind only traces of its existence. It's a narrative written in stone, inviting those who stumble upon it to imagine the lives that once thrived in this mystical place.",
    "As sunlight filters through the canopy, it illuminates the ruins with a soft glow. Shadows play on the weathered surfaces, creating a chiaroscuro effect that adds to the air of mystery.",
    "Among the stones, wildflowers bloom, adding a touch of color to the ancient monochrome. It's a testament to nature's ability to find beauty even in the midst of decay.",
    "In the heart of the forest, a hidden glade bathes in the soft glow of sunlight filtering through the leaves. Butterflies flit about, their delicate wings carrying them from bloom to bloom.",
    "The glade is a secret haven, a sanctuary for those seeking a moment of respite. The grass beneath bare feet is cool and inviting, inviting wanderers to linger and soak in the tranquility.",
    "Floral scents waft through the air, creating an olfactory tapestry that complements the visual feast. It's a sensory experience that heightens the connection to the natural world.",
    "As the day unfolds, the glade becomes a stage for the dance of light and shadow. Sunbeams create patterns on the ground, and the rustle of leaves adds a gentle percussion to the symphony of nature.",
    "In the heart of the forest, an ancient tree stands as a silent sentinel. Its gnarled branches reach towards the sky, each one a testament to the passage of centuries.",
    "The tree's roots, like fingers digging into the earth, anchor it to the ground. They tell a story of resilience, of a life deeply intertwined with the soil beneath.",
    "Moss clings to the bark, creating a tapestry of green that adds to the tree's timeless beauty. It's a symbiotic relationship, a dance between the living and the nonliving.",
    "Birds find refuge in the tree's branches, their songs becoming part of the tree's story. It's a collaboration between the flora and the fauna, a harmony that resonates through the forest.",
    "Underneath the tree's expansive canopy, a sense of quiet reverence fills the air. It's a space where time seems to slow, and the whispers of the wind carry ancient tales.",
    "In the heart of the forest, a network of trails weaves through the undergrowth. Each path is a choice, a decision to explore and discover the wonders hidden within the green labyrinth.",
    "Sunlight filters through the leaves, casting a dappled pattern on the forest floor. It's a guide for those who traverse the trails, a natural navigation system that leads to new revelations.",
    "Occasional clearings offer glimpses of the sky, a reminder of the vastness beyond the trees. It's a moment to pause, to appreciate the beauty of the natural world from different perspectives.",
];

const wordNumberParagraphs = [
    "Artificial Intelligence (AI) is revolutionizing industries, enhancing efficiency, and automating tasks. Machine learning algorithms analyze vast datasets, making predictions and improving decision-making processes. The technology market is booming, with an annual growth rate of 12.5%.",
    "Blockchain, the backbone of cryptocurrencies, ensures secure and transparent transactions. Decentralized ledgers eliminate intermediaries, reducing fraud and enhancing trust. The market capitalization of blockchain technology is projected to reach $69 billion by 2027.",
    "Cybersecurity is paramount in our digital age. With the rise of cyber threats, robust measures are essential. Companies invest heavily in cybersecurity, with global spending expected to surpass $170 billion by 2022.",
    "The Internet of Things (IoT) connects devices, fostering seamless communication. Smart homes, wearables, and industrial sensors are part of this interconnected ecosystem. The number of IoT devices is expected to exceed 75 billion by 2025.",
    "5G technology is transforming connectivity, offering faster speeds and lower latency. The global 5G infrastructure market is predicted to reach $47 billion by 2027. High-speed internet enables advancements in augmented reality and virtual reality applications.",
    "Cloud computing facilitates scalable and flexible storage solutions. The cloud services market is expanding rapidly, with projections exceeding $623 billion by 2023. Cloud-based collaboration tools enhance remote work efficiency.",
    "Augmented Reality (AR) overlays digital content onto the real world. From gaming to education, AR applications are diverse. The AR market is expected to surpass $70 billion by 2023.",
    "Quantum computing leverages quantum bits (qubits) to process complex calculations. Quantum computers have the potential to solve problems unsolvable by classical computers. Investments in quantum computing are on the rise, with substantial breakthroughs anticipated.",
    "Big Data analytics extracts valuable insights from massive datasets. Businesses utilize data-driven decision-making strategies. The global big data market is forecasted to reach $103 billion by 2027.",
    "Robotics is advancing automation in various industries. Collaborative robots (cobots) work alongside humans, enhancing productivity. The robotics market is expected to surpass $275 billion by 2025.",
    "Biotechnology innovations, such as CRISPR gene editing, revolutionize healthcare. Personalized medicine and advancements in genetic engineering are transforming the biotech landscape. The global biotechnology market is projected to exceed $775 billion by 2024.",
    "Autonomous vehicles are reshaping transportation. Electric and self-driving cars reduce emissions and increase safety. The autonomous vehicle market is predicted to reach $556 billion by 2026.",
    "Green technology focuses on sustainability, with renewable energy sources leading the way. Solar and wind power investments continue to rise, with the global renewable energy market expected to surpass $2 trillion by 2025.",
    "Artificial Neural Networks (ANNs) mimic the human brain's learning process, enhancing machine learning capabilities. Deep learning algorithms power voice recognition, image processing, and natural language understanding.",
    "Quantum encryption ensures secure communication by utilizing the principles of quantum mechanics. Quantum key distribution (QKD) prevents eavesdropping, providing an ultra-secure method for transmitting sensitive information.",
    "Drones are utilized for various purposes, from aerial photography to surveillance. Delivery drones are transforming logistics, enabling faster and more efficient delivery services. The global drone market is anticipated to reach $50 billion by 2025.",
    "Edge computing processes data closer to the source, reducing latency and enhancing real-time applications. Edge computing is crucial for the success of IoT devices and applications.",
    "Fintech (financial technology) innovations are disrupting traditional banking and financial services. Mobile payment solutions, blockchain-based finance, and robo-advisors are reshaping the financial industry.",
    "Neuromorphic computing mimics the human brain's architecture, improving machine learning efficiency. Neuromorphic chips enable faster processing and energy-efficient computing.",
    "Chatbots powered by artificial intelligence enhance customer service and support. Natural Language Processing (NLP) enables chatbots to understand and respond to human language effectively.",
    "Digital twins replicate physical objects or processes in the digital realm. Digital twin technology is widely used in manufacturing, healthcare, and urban planning for simulation and analysis.",
    "Biometric authentication methods, such as fingerprint and facial recognition, enhance security and streamline user authentication processes. Biometrics are integral to modern access control systems.",
    "The rise of 3D printing technology enables cost-effective and customizable manufacturing. Additive manufacturing processes are used in various industries, from healthcare to aerospace.",
    "Smart cities leverage technology to enhance urban living. IoT sensors, data analytics, and automation contribute to efficient traffic management, waste reduction, and sustainable energy usage.",
    "Voice-activated virtual assistants, like Siri and Alexa, utilize Natural Language Processing (NLP) to understand and respond to user commands. These virtual assistants play a significant role in smart homes and devices.",
    "The adoption of DevOps practices accelerates software development cycles. DevOps aims to enhance collaboration between development and operations teams, ensuring faster and more reliable software delivery.",
    "Spatial computing merges physical and digital worlds, offering immersive experiences. Augmented Reality (AR) and Virtual Reality (VR) applications in gaming, education, and healthcare showcase the potential of spatial computing.",
    "Genomic medicine utilizes genetic information for personalized healthcare. Advances in genomics enable targeted therapies, disease prevention, and early detection.",
    "Robotic Process Automation (RPA) automates repetitive tasks, improving operational efficiency. RPA technology is widely adopted in industries such as finance, healthcare, and manufacturing.",
    "The rise of 6G technology promises even faster and more reliable wireless connectivity. 6G is anticipated to support innovations in augmented reality, holographic communication, and advanced artificial intelligence applications.",
    "Biometric wearables, such as fitness trackers and smartwatches, monitor health metrics and provide personalized insights. Wearable technology is integral to the quantified self-movement.",
    "Digital health technologies, including telemedicine and health apps, revolutionize healthcare delivery. Remote patient monitoring and virtual consultations enhance accessibility and patient outcomes.",
    "Blockchain-based smart contracts automate and enforce contractual agreements. Smart contracts streamline processes in various industries, from legal to supply chain management.",
    "Neuralink, founded by Elon Musk, aims to develop brain-machine interfaces. Brain implants hold the potential to enhance cognitive abilities and address neurological conditions.",
    "Quantum internet leverages quantum entanglement for secure and instantaneous communication. Quantum communication networks are being researched for their potential in future internet infrastructure.",
    "The convergence of 5G and edge computing unlocks new possibilities for real-time applications, enabling innovations in gaming, augmented reality, and autonomous systems.",
    "The OpenAI GPT (Generative Pre-trained Transformer) model represents a breakthrough in natural language processing, capable of generating coherent and contextually relevant text.",
    "Graphene, a single layer of carbon atoms, exhibits remarkable strength and conductivity. Graphene-based technologies have applications in electronics, energy storage, and material science.",
    "Cyber-physical systems integrate computing and physical processes, enabling automation and real-time monitoring. Industrial IoT and smart factories are examples of cyber-physical systems.",
    "Quantum sensors leverage quantum principles for ultra-precise measurements. Quantum sensors have applications in navigation, medical imaging, and environmental monitoring.",
    "Edge AI (Artificial Intelligence) brings machine learning capabilities directly to edge devices, reducing latency and enhancing real-time decision-making.",
    "The rise of Meta Platforms, formerly Facebook, emphasizes the metaverse concept. The metaverse envisions a collective virtual space where users interact with digital environments and each other.",
    "Cryptocurrencies, led by Bitcoin and Ethereum, are reshaping the financial landscape. Blockchain technology underpins decentralized finance (DeFi) and non-fungible tokens (NFTs).",
    "Autonomous drones equipped with AI navigate and make decisions independently. These drones find applications in agriculture, surveillance, and delivery services.",
    "Cybersecurity threats evolve, leading to the development of AI-driven cybersecurity solutions. AI enhances threat detection, incident response, and vulnerability management.",
    "Digital transformation initiatives drive organizations to embrace modern technologies. Cloud migration, data analytics, and automation are key components of digital transformation strategies.",
    "Zero-trust security models challenge traditional security paradigms, emphasizing continuous verification and strict access controls. Zero-trust frameworks enhance cybersecurity resilience.",
    "The proliferation of electric vehicles, powered by advancements in battery technology, contributes to sustainable transportation solutions. Battery innovations focus on energy density and charging speed.",
    "The intersection of biology and technology leads to innovations in bioelectronics. Bioelectronic devices interface with biological systems, offering new possibilities in healthcare and diagnostics.",
    "Quantum supremacy, achieved by quantum computers, demonstrates their ability to outperform classical computers in specific tasks. Quantum computing's potential impact spans optimization, cryptography, and simulation.",
    "The Circular Economy, driven by technology, emphasizes sustainable practices and waste reduction. Digital solutions enable efficient resource management and recycling processes.",
    "Edge analytics processes data locally on edge devices, reducing the need for centralized processing. Edge analytics is crucial for IoT applications in real-time monitoring and decision-making.",
    "The democratization of AI empowers individuals and businesses to leverage machine learning models and algorithms. AI tools and platforms enable non-experts to integrate AI into their applications.",
    "The fusion of biology and technology results in biohacking and augmentation. Biohackers explore enhancing human capabilities through technology, blurring the lines between man and machine.",
    "Quantum machine learning leverages quantum computing for faster and more efficient machine learning algorithms. Quantum algorithms hold the potential to revolutionize data analysis and pattern recognition.",
];

const wordPunctuationParagraphs = [
"make use new into but can out go how do out want to see/, good way even because first and we even to at about as work+",
 "there as want first for year who give their because year after my of time now they an em), this good their she to also way two new want day what)",
 "my who so way out they who this they they year these after into%, also new an by get how go new most for just it us how or,, get but now even at give even see is think an year two work#",
 "use us world first she big found how all em work that!, us into an at with give give like by em can so new us all way in)",
 "can will a would his much way him back new em-, day to on about at use they get on take us the about most these which work=",
 "you go every is em know how one give every know it no also day want any the it day), want time will go world your new think new day with for on can for what can me long*",
 "what how first her day go it new out what us it on be most make#, found long our even but your what most his first now use you if so what first our&",
 "much take take long now all take she into now because day of about also and,, what every these see most what these see two world her it#",
 "we after back no two way if long even most work so be em because time what well), me can one when do but into if if much what-",
 "go they any would so world a say but give use us see give also found be work the any-, how of how but but as could my use two see go or even on they(",
 "any get like or time could all an because new these way$, day as because who know they think because her take use is even of get people all his no=",
 "time first two well make we because into there even she an no make first who do be(, you us well take us we use one new long your even think work day their most will want#",
 "it also there our also his found think me these these some world work&, use because you work take on most day his her go or we at just give up your want&",
 "about most day out go be could if as way these all do with/, us give even know it want most think know work which by she her#",
 "after our one time is long and that work world which now well=, much they as work if our her work day after work but good like make my these one*",
 "her so of use as by this would long two can know us in people even also&, will most or a out or all me of no be new see,, a these on see after get do go or most us take at as his because this two give+",
 "give as big year now when make from most after use who now these her the well all=, her found give would us an want every two way when time like see be every+",
 "found these work and big for my give see if if world!, any my at up be use because world of his you from these also way they it any=",
 "me one two also time use use day take big way use found use these what any=, is up can make two any on also give give because good but time make their so day all$",
 "our an long most every two up us first into&, is our go work go work our their in to his), long there would our how will so as now day there how=",
 "even use me what which these one even my way that much her how-, some go for any want two an that first for*, it how what any most their new the into because even people as at in good=",
 "you in they use two to now people now use=, now our to there found when of any which no her because most we+, who big do give now get even that no year day big these day who any world my us me/",
 "by is first big this much that world world even because long make found good who him now new#",
 // ... 30 more paragraphs, each with exactly 100 words
];

const wordNumberPunctuationParagraphs = [
    "In the bustling city, people rushed through the streets as if time itself were chasing them. Horns honked, and the rhythmic steps of pedestrians created a symphony of urban life. Amidst the chaos, I found solace in a small cafe, sipping on a rich 1-shot espresso. The bitterness of the coffee contrasted the sweetness of my thoughts, a momentary pause in the daily hustle.",
    
    "Underneath the starlit sky, a lone wolf howled, its melancholic cry echoing through the 2am silence. In the quiet of the night, I contemplated the mysteries of the universe. The moon cast its soft glow, and constellations painted stories in the vast canvas above. It was a moment of introspection, a conversation with the cosmos.",
    
    "As I strolled through the park, I observed a group of children playing a spirited game of tag. Laughter filled the air, and memories of my own 3rd-grade adventures flooded back. Nostalgia and innocence collided in a beautiful dance, creating a timeless scene of joy and camaraderie.",
    
    "Amidst the towering shelves of the library, I delved into the world of literature. The 4 corners of the books held stories that transcended time. Each page turned unveiled a new adventure, and the scent of aged paper carried the wisdom of countless authors who had treaded this literary path before me.",
    
    "In the quaint village, where the cobblestone streets told tales of centuries past, I attended a 5-course feast at the local inn. The aroma of spices lingered in the air as each dish revealed the culinary prowess of the chef. The flavors danced on my palate, and the communal dining experience echoed the warmth of the tight-knit community.",
    
    "Aboard the train, I gazed out at the passing landscapes. Fields stretched as far as the eye could see, punctuated by the occasional 6-carriage freight train. The rhythmic clacking of the wheels against the tracks lulled me into a contemplative trance, a journey within a journey.",
    
    "Beneath the starry night, I pitched a tent on the 7th hill overlooking the valley. The cool breeze carried whispers of ancient stories, and the crackling campfire illuminated the faces of friends. In that moment, surrounded by nature's wonders, I felt a connection that transcended the boundaries of everyday life.",
    
    "In the heart of the city, an 8-story mural adorned the side of a building. The vibrant colors and intricate details told a visual story that captivated passersby. Artistic expression, like a universal language, communicated emotions and perspectives beyond words.",
    
    "As the clock struck 9, I sat by the window, watching the raindrops tap rhythmically on the glass. The cozy ambiance of the cafe provided the perfect backdrop for a reflective moment. A notebook and pen became companions in the exploration of thoughts, capturing the essence of the rainy evening.",
    
    "At the summit of the mountain, I marveled at the breathtaking view. The 10 peaks in the distance stood like sentinels guarding the secrets of the valley below. Each summit had its own character, a testament to the diverse beauty that nature sculpted over eons.",
    
    "In the middle of a bustling market, a street performer juggled 11 flaming torches with finesse. The crowd gasped in amazement, and coins clinked in appreciation. The performer's skill, a testament to hours of practice, transformed the market square into a temporary stage of awe and wonder.",
    
    "Within the walls of an ancient castle, 12 suits of armor stood sentinel in the grand hall. Each suit bore the scars of battles long past, a silent testimony to the valor of knights who once called the castle home. Tourists marveled at the history that echoed through the stone corridors.",
    
    "Under the shade of a 13th-century oak tree, a storyteller spun tales of mythical creatures and ancient civilizations. Listeners, young and old, gathered in a circle, captivated by the narrative. The rustling leaves overhead seemed to whisper secrets of times long gone.",
    
    "In the realm of technology, a 14-nanometer chip powered the latest generation of devices. Engineers, armed with precision tools, meticulously crafted the minuscule components. The chip's efficiency and speed marked a milestone in the relentless march of innovation.",
    
    "As the clock struck 15:00, the afternoon sun cast long shadows on the city streets. Workers, anticipating the end of the workday, hurriedly completed their tasks. The city buzzed with the energy of a midday hustle, a blend of productivity and anticipation.",
    
    "At the crossroads of four ancient paths, a weathered signpost pointed travelers towards 16 different destinations. Each direction promised a unique adventure, whether it be a bustling market town, a serene monastery, or a mysterious forest shrouded in legend.",
    
    "In the serene garden, 17 bonsai trees stood as living sculptures, each meticulously pruned and shaped. The art of bonsai, a tradition passed down through generations, reflected the harmony between human intervention and the untamed beauty of nature.",
    
    "Under the neon lights of the city, a street vendor sold exotic fruits from 18 different countries. The vibrant colors and enticing aromas drew in passersby. Each fruit told a story of distant lands, a sensory journey without leaving the bustling streets.",
    
    "As I gazed into the night sky, 19 constellations adorned the celestial canvas. The twinkling stars formed patterns that sparked the imagination. Ancient cultures had woven myths around these stellar arrangements, connecting the dots with tales of gods, heroes, and cosmic adventures.",
    
    "In the art studio, an artist carefully mixed 20 different shades of paint on the palette. The canvas awaited the brushstrokes that would bring forth a masterpiece. Each color held the potential to evoke emotions and convey the artist's innermost thoughts.",
    
    "On the 21st floor of a skyscraper, a penthouse offered panoramic views of the city below. The skyline, a tapestry of lights, stretched out in all directions. The city, seen from this height, felt both vast and intimate, a metropolis of dreams and aspirations.",
    
    "Within the walls of an ancient temple, 22 stone pillars supported the weight of history. Intricate carvings adorned the pillars, depicting scenes from mythologies and the lives of those who had sought solace within the sacred sanctuary.",
    
    "In the heart of a bustling market, a vendor sold handmade crafts from 23 different countries. The vibrant tapestry of colors and textures showcased the diversity of cultures. Shoppers browsed through treasures, each item telling a story of craftsmanship and tradition.",
    
    "As the sun dipped below the horizon, a 24-member orchestra tuned their instruments in preparation for a night of enchanting melodies. The conductor, wielding a baton like a maestro, guided the musicians in a harmonious symphony that echoed through the concert hall.",
    
    "In the desert, a caravan of 25 camels traversed the dunes, carrying precious cargo across the vast expanse. The nomads, guided by ancient navigational wisdom, followed the North Star as they journeyed through the silent wilderness.",
    
    "At the heart of the bustling city, a clock tower chimed 26 times, marking the passing of each hour. The resonant tones echoed through the city streets, a rhythmic reminder of the constant flow of time and the moments that slipped away.",
    
    "In a vibrant market square, a street artist painted a mural that spanned 27 feet in height. The mural depicted scenes of community, diversity, and resilience. Onlookers marveled at the artist's ability to capture the spirit of the city in such a grand and colorful display.",
    
    "As I walked along the riverbank, I counted 28 ripples created by a skipping stone. The concentric circles danced on the water's surface, creating a fleeting but mesmerizing display. It was a simple yet profound reminder of the interconnectedness of actions and the ripple effects they can have.",
    
    "In the heart of a bustling train station, 29 platforms served as gateways to distant destinations. The arrival and departure boards flickered with updates, and the echoing announcements filled the air. Travelers, with tickets in hand, embarked on journeys that crisscrossed the nation.",
    
    "Amidst the vineyard, 30 rows of grapevines stretched out in a symmetrical pattern. The meticulous arrangement allowed each vine to receive the perfect amount of sunlight. The vineyard, a patchwork of green and purple, promised a fruitful harvest.",
    
    "At the stroke of 31 minutes past midnight, a lone owl hooted in the silent forest. The nocturnal symphony began as creatures stirred in the darkness. The moon cast an ethereal glow on the woodland floor, revealing the secrets hidden beneath the night's canopy.",
    
    "Within the heart of the city, a skyscraper reached a towering height of 32 stories. Elevators whisked occupants to the upper floors, where panoramic views unfolded. The city lights below, like a sea of stars, stretched out in all directions.",
    
    "On the 33rd day of my journey, I reached the summit of the mountain. The panoramic view from the peak stretched beyond the horizon, a breathtaking reward for the arduous climb. The crisp mountain air filled my lungs as I marveled at the beauty below.",
    
    "In the heart of a bustling market, a street performer entertained the crowd with a repertoire of 34 different juggling tricks. The skilled performer seamlessly tossed and caught a variety of objects, each movement drawing cheers from the captivated audience.",
    
    "Beneath the ancient oak tree, a group of friends gathered for the 35th annual storytelling festival. Each participant shared a tale, weaving a rich tapestry of narratives that spanned cultures and genres. The flickering campfire added a warm glow to the storytelling circle.",
    
    "At the intersection of five roads, a roundabout bustled with traffic as vehicles navigated the circular path. The circular design facilitated a smooth flow of cars, a dance of motion orchestrated by the traffic lights and the rhythm of the city.",
    
    "In the serene garden, 36 stone statues of mythical creatures stood guard, their watchful eyes surveying the tranquil surroundings. The ancient symbols etched into the stone told stories of folklore and the belief in magical beings that once roamed the earth.",
    
    "As the sun dipped below the horizon, a flock of 37 birds painted the evening sky with their graceful flight. Their synchronized movements created a living masterpiece, a fleeting but mesmerizing display of avian choreography.",
    
    "Within the heart of the city, a 38-year-old oak tree stood as a silent witness to the changing urban landscape. Its gnarled branches stretched towards the sky, a testament to the enduring nature of life amidst the ever-evolving cityscape.",
    
    "In the bustling market, a vendor offered a collection of 39 handmade rugs, each a unique masterpiece of craftsmanship and design. The vibrant patterns and intricate details showcased the artistry of cultures that spanned continents.",
];

const BodyMain = ({ isNumber, isPunctuation, isTimer, isFirstStart, setIsFirstStart, isEsc, onCompletion, isEnter, setIsEnter }) => {
  const [para, setPara] = useState("");
  const [countDown, setCountDown] = useState(isTimer);
  const [lastTypedChar, setLastTypedChar] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef();
  const inputRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState(0);

  const startTimer = useCallback(() => {
    console.log("first");
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCountDown((prevCountDown) => {
        if (prevCountDown === 0) {
          clearInterval(intervalRef.current);
          setCompleted(true);
          return 0;
        } else {
          return prevCountDown - 1;
        }
      });
    }, 1000);
    console.log("logs");
  }, []);

  useEffect(() => {
    console.log("Countdown updated:", countDown);
  }, [countDown, completed]);

  const generateParas = useCallback(() => {
    clearInterval(intervalRef.current);
    const randomNumber = Math.floor(Math.random() * 20);

    if (isNumber && isPunctuation) {
      setPara(wordNumberPunctuationParagraphs[randomNumber].split(" ").slice(0, 50).join(" "));
    } else if (isPunctuation) {
      setPara(wordPunctuationParagraphs[randomNumber].split(" ").slice(0, 50).join(" "));
    } else if (isNumber) {
      setPara(wordNumberParagraphs[randomNumber].split(" ").slice(0, 50).join(" "));
    } else {
      setPara(wordParagraphs[randomNumber].split(" ").slice(0, 50).join(" "));
    }

    setCountDown(isTimer);
    setIsFirstStart(false);
  }, [isNumber, isPunctuation, isTimer, setPara, setCountDown, setIsFirstStart]);

  useEffect(() => {
    generateParas();
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [generateParas]);

  
  

  useEffect(() => {
    console.log("input value", inputValue);
  
    if (countDown === 1) {
        let correctCount = 0;
        let incorrectCount = 0;
      if (para && inputValue) {
        const minLength = Math.min(para.length, inputValue.length);
  
        for (let charIndex = 0; charIndex < minLength; charIndex++) {
          const paraChar = para[charIndex];
          const inputChar = inputValue[charIndex];
          const isCharCorrect = paraChar === inputChar;
  
          console.log(`Character ${charIndex}:`, isCharCorrect ? "correct" : "incorrect");
  
          if (isCharCorrect) {
            correctCount++;
          } else {
            incorrectCount++;
          }
        }
  
        console.log("Correct Count:", correctCount);
        console.log("Incorrect Count:", incorrectCount);
      }
  
      if (completed || inputValue.length === para.length) {
        const wordsTyped = inputValue.split(/\s+/); // Split on any whitespace character
        const wordsInPara = para.split(/\s+/);
  
        let correctWords = 0;
        let incorrectWords = 0;
  
        for (let index = 0; index < Math.min(wordsTyped.length, wordsInPara.length); index++) {
          if (wordsTyped[index] === wordsInPara[index]) {
            correctWords++;
          } else {
            incorrectWords++;
          }
        }
  
        console.log("Correct Word Count:", correctWords);
        console.log("Incorrect Word Count:", incorrectWords);
      }
      onCompletion(true, correctCount, incorrectCount);
    }
  }, [inputValue, para, completed, isFirstStart, isTimer, countDown, startTimer, onCompletion]);
  

  const handleKeyDown = (event) => {
    const pressedKey = event.key;
    const unwantedKeys = ["Backspace", "Alt", "Shift", "Tab", "Escape", "Control"];

    // ... (previous code)
    if(pressedKey === 'Enter' && !isFirstStart && isTimer){
      setIsEnter(true)
    }

    if (
      !unwantedKeys.includes(pressedKey) &&
      (/[a-zA-Z]/.test(pressedKey) || /\d/.test(pressedKey) || /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~\s]/.test(pressedKey)) &&
      pressedKey !== "Enter"
    ) {
      setLastTypedChar(pressedKey);
      setInputValue((prevInputValue) => prevInputValue + pressedKey);

      // Update cursor position
      setCursorPosition((prevPosition) => Math.min(prevPosition + 1, para.length));
    } else if (event.keyCode === 13 && !isFirstStart && isTimer) {
      setIsFirstStart(true);
      startTimer();
    } else if (event.keyCode === 8) {
      const inputValue = inputRef.current.value;
      setLastTypedChar(inputValue.slice(-1));
      setInputValue((prevInputValue) => prevInputValue.slice(0, -1));

      // Update cursor position on backspace
      setCursorPosition((prevPosition) => Math.max(prevPosition - 1, -1));
    }
  };

  useEffect(() => {
    // Ensure that the cursor is visible when the component mounts
    setCursorPosition(-1);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
  
    if (isFirstStart && isTimer) {
      startTimer();
    }
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearInterval(intervalRef.current);
    };
  }, [isTimer, isFirstStart, startTimer]);
  const handleRefreshClick = () => {
    clearInterval(intervalRef.current);
    generateParas();
    setInputValue("");
    setLastTypedChar("");
    setCursorPosition(-1); // Reset cursor position to the beginning
    setIsEnter(false)
  };

  // Inside the renderWordElements function
  const renderWordElements = (cursorPosition) => {
    const paraChars = para.split("");
    const inputChars = inputValue.split("");

    return paraChars.map((char, charIndex) => {
      const isCharCorrect = inputChars.length >= charIndex + 1 && inputChars[charIndex] === paraChars[charIndex];
      const isMismatched =
        !isCharCorrect && (inputChars[charIndex] !== undefined || char === " ") && inputChars[charIndex] !== paraChars[charIndex];
      const isCursorVisible = cursorPosition === charIndex;

      return (
        <span
          key={charIndex}
          ref={(el) => isCursorVisible && el && el.scrollIntoView({ block: "center", inline: "nearest" })}
          className={`${
            isMismatched ? "incorrect-char" : isCharCorrect ? "correct-char" : "colorless"
          } ${isCursorVisible ? "blinking-cursor active-char" : ""}`}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };

  return (
    <div className="typingTest flex flex-col gap-5">
      <div className="note text-center font-Roboto text-[#646669] text-xl">
        <h2 className={`inline-block p-2 rounded-lg ${!isEnter && countDown ? 'animate-ping rounded-full' : ''} `}>
          Press{" "}
          <span className="px-[5px] py-[0] dark:bg-[#646669] bg-white dark:text-[#3c393f] text-black rounded-[2px]">
            ENTER
          </span>{" "}
          to start typing every time!!
        </h2>
      </div>
      <div className="textModesNotice w-100% flex justify-center">
        <div className="textButton font-Roboto flex items-center gap-3 text-lg text-[#646669] cursor-pointer hover:text-black dark:hover:text-[#ededed] ease-in-out duration-300">
          <TiWorld className="text-2xl" />
          <span>english</span>
        </div>
      </div>

      <input
        ref={inputRef}
        type="text"
        className="input-field invisible absolute z-[-99]"
        onKeyDown={isEsc && !isEnter ? null : handleKeyDown}
        value={inputValue}
      />
      <div className={`text-[#e2b714] font-medium ${countDown > 0 && isFirstStart ? "block" : "hidden"}`}>
        <h1 className="text-xl">{countDown}</h1>
      </div>

      <div className="words-wrapper w-[80vw] overfl">
        <div className="font-Roboto words text-[#646669] text-xl tracking-[3px]">
          {renderWordElements(cursorPosition)}
        </div>
      </div>

      <div className="refresh w-100% flex justify-center text-2xl text-[#646669] cursor-pointer hover:text-black dark:hover:text-[#ededed] ease-in-out duration-300 font-medium">
        <IoMdRefresh onClick={handleRefreshClick} />
      </div>
    </div>
  );
};

export default BodyMain;

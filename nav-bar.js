/* =========================================================
   PHILOSOPHY COMMAND PALETTE
   Ctrl + K / Cmd + K
   ========================================================= */

(() => {

    /* ---------------------------------------------------------
       PHILOSOPHY LIBRARY INDEX
       --------------------------------------------------------- */

    const philosophyPages = [

        /* HOME */

        {
            title: "Home",
            category: "Library",
            description: "The Great Library of Philosophy",
            url: "index.html"
        },

        /* HISTORY */

        {
            title: "History of Philosophy",
            category: "History",
            description: "The development of philosophical thought",
            url: "history.html"
        },

        {
            title: "Ancient Greece",
            category: "History",
            description: "Socrates, Plato, Aristotle",
            url: "ancient-greece.html"
        },

        {
            title: "Ancient India",
            category: "History",
            description: "Vedic and classical philosophical traditions",
            url: "ancient-india.html"
        },

        {
            title: "Ancient China",
            category: "History",
            description: "Confucianism and Daoism",
            url: "ancient-china.html"
        },

        {
            title: "Islamic Philosophy",
            category: "History",
            description: "Reason, faith, and the classical heritage",
            url: "islamic-philosophy.html"
        },

        {
            title: "Medieval Philosophy",
            category: "History",
            description: "Scholasticism and theological inquiry",
            url: "medieval-philosophy.html"
        },

        {
            title: "Renaissance Philosophy",
            category: "History",
            description: "Humanism and intellectual renewal",
            url: "renaissance-philosophy.html"
        },

        {
            title: "Enlightenment Philosophy",
            category: "History",
            description: "Reason, science, and liberty",
            url: "enlightenment-philosophy.html"
        },

        {
            title: "Modern Philosophy",
            category: "History",
            description: "From Descartes to the nineteenth century",
            url: "modern-philosophy.html"
        },

        {
            title: "Contemporary Philosophy",
            category: "History",
            description: "Twentieth century to the present",
            url: "contemporary-philosophy.html"
        },


        /* -----------------------------------------------------
           FOUNDATIONAL BRANCHES
           ----------------------------------------------------- */

        {
            title: "Ethics",
            category: "Branches",
            description: "Morality, values, and the good life",
            url: "ethics-branch-philosophy.html"
        },

        {
            title: "Metaphysics",
            category: "Branches",
            description: "Reality, existence, and being",
            url: "metaphysics-branch-philosophy.html"
        },

        {
            title: "Epistemology",
            category: "Branches",
            description: "Knowledge, belief, and justification",
            url: "epistemology-branch-philosophy.html"
        },

        {
            title: "Logic",
            category: "Branches",
            description: "Reasoning, arguments, and inference",
            url: "logic-branch-philosophy.html"
        },

        {
            title: "Aesthetics",
            category: "Branches",
            description: "Beauty, art, and aesthetic experience",
            url: "aesthetics-branch-philosophy.html"
        },


        /* -----------------------------------------------------
           SPECIALIZED BRANCHES
           ----------------------------------------------------- */

        {
            title: "Philosophy of Mind",
            category: "Branches",
            description: "Consciousness, thought, and mental states",
            url: "mind-philosophy.html"
        },

        {
            title: "Philosophy of Language",
            category: "Branches",
            description: "Meaning, reference, and communication",
            url: "language-philosophy.html"
        },

        {
            title: "Philosophy of Education",
            category: "Branches",
            description: "Learning, knowledge, and human development",
            url: "education-philosophy.html"
        },

        {
            title: "Philosophy of Law",
            category: "Branches",
            description: "Justice, rights, authority, and legal systems",
            url: "law-philosophy.html"
        },

        {
            title: "Political Philosophy",
            category: "Branches",
            description: "Power, freedom, justice, and the state",
            url: "political-philosophy.html"
        },

        {
            title: "Philosophy of History",
            category: "Branches",
            description: "Historical knowledge, meaning, and progress",
            url: "history-philosophy.html"
        },

        {
            title: "Philosophy of Science",
            category: "Branches",
            description: "Science, explanation, and scientific knowledge",
            url: "science-philosophy.html"
        },

        {
            title: "Philosophy of Mathematics",
            category: "Branches",
            description: "Numbers, mathematical truth, and foundations",
            url: "maths-philosophy.html"
        },

        {
            title: "Philosophy of Religion",
            category: "Branches",
            description: "God, faith, reason, and religious experience",
            url: "religion-philosophy.html"
        },


        /* -----------------------------------------------------
           MAIN SECTIONS
           ----------------------------------------------------- */

        {
            title: "Philosophers & Thinkers",
            category: "Library",
            description: "Explore major philosophical thinkers",
            url: "thinkers.html"
        },

        {
            title: "Schools of Philosophy",
            category: "Library",
            description: "Major philosophical schools and traditions",
            url: "schools.html"
        },

        {
            title: "Philosophy Books",
            category: "Library",
            description: "Important philosophical works and texts",
            url: "books.html"
        },

        {
            title: "World Literature",
            category: "Literature",
            description: "Literary works and philosophical ideas",
            url: "world-literature.html"
        },

        {
            title: "Philosophy Blog",
            category: "Blog",
            description: "Articles and philosophical discussions",
            url: "blog.html"
        },

        {
            title: "Philosophy of Education",
            category: "Branches",
            description: "Learning, knowledge, and human development",
            url: "education-philosophy.html"
        },

        {
            title: "Philosophy of History",
            category: "Branches",
            description: "Historical knowledge, meaning, and progress",
            url: "history-philosophy.html"
        },

        {
            title: "Philosophy of Language",
            category: "Branches",
            description: "Meaning, reference, and communication",
            url: "language-philosophy.html"
        },

        {
            title: "Philosophy of Law",
            category: "Branches",
            description: "Justice, rights, authority, and legal systems",
            url: "law-philosophy.html"
        },

        {
            title: "Philosophy of Mathematics",
            category: "Branches",
            description: "Numbers, mathematical truth, and foundations",
            url: "maths-philosophy.html"
        },

        {
            title: "Philosophy of Mind",
            category: "Branches",
            description: "Consciousness, thought, and mental states",
            url: "mind-philosophy.html"
        },

        {
            title: "Political Philosophy",
            category: "Branches",
            description: "Power, freedom, justice, and the state",
            url: "political-philosophy.html"
        },

        {
            title: "Philosophy of Religion",
            category: "Branches",
            description: "God, faith, reason, and religious experience",
            url: "religion-philosophy.html"
        },

        {
            title: "Philosophy of Science",
            category: "Branches",
            description: "Science, explanation, and scientific knowledge",
            url: "science-philosophy.html"
        },

        {
            title: "African Philosophy",
            category: "History",
            description: "Philosophical traditions and intellectual thought of Africa",
            url: "african-philosophy.html"
        },

        {
            title: "Ancient Egyptian Philosophy",
            category: "History",
            description: "Wisdom, order, and the principles of Ma'at",
            url: "ancient-egypt.html"
        },

        {
            title: "Hellenistic & Roman Philosophy",
            category: "History",
            description: "Stoicism, Epicureanism, and the Greco-Roman world",
            url: "hellenistic-roman-philosophy.html"
        },

        {
            title: "Ancient Mesopotamian Philosophy",
            category: "History",
            description: "Wisdom, cosmos, and the earliest civilizations",
            url: "ancient-mesopotamia.html"
        },

        {
            title: "Korean Philosophy",
            category: "History",
            description: "Confucianism, Buddhism, and Korean philosophical traditions",
            url: "korean-philosophy.html"
        },

        {
            title: "Japanese Philosophy",
            category: "History",
            description: "Buddhist, Shinto, and Japanese philosophical traditions",
            url: "japanese-philosophy.html"
        },

        {
            title: "Jewish Philosophy",
            category: "History",
            description: "Faith, reason, ethics, and Jewish philosophical thought",
            url: "jewish-philosophy.html"
        },

        {
            title: "Ancient Persian Philosophy",
            category: "History",
            description: "Zoroastrian thought and the philosophy of ancient Persia",
            url: "ancient-persian-philosophy.html"
        },

        {
            title: "Kabir",
            category: "Thinkers",
            description: "Mystic poet and spiritual thinker of medieval India",
            url: "kabir.html"
        },

        {
            title: "Jiddu Krishnamurti",
            category: "Thinkers",
            description: "Independent thinker on freedom, consciousness, and self-knowledge",
            url: "jiddu-krishnamurti.html"
        },

        {
            title: "Gautama Buddha",
            category: "Thinkers",
            description: "Founder of Buddhism and philosopher of suffering, liberation, and the path to awakening",
            url: "gautama-buddha.html"
        },

        {
            title: "Chanakya",
            category: "Thinkers",
            description: "Ancient Indian political thinker, strategist, and author of the Arthashastra",
            url: "chanakya.html"
        },

        {
            title: "Adi Shankaracharya",
            category: "Thinkers",
            description: "Advaita Vedanta philosopher of non-duality and the nature of reality",
            url: "adi-shankaracharya.html"
        },

        {
            title: "Mahavira",
            category: "Thinkers",
            description: "Jain teacher associated with nonviolence, liberation, and spiritual discipline",
            url: "mahavira.html"
        },

        {
            title: "Nagarjuna",
            category: "Thinkers",
            description: "Buddhist philosopher known for Madhyamaka and the philosophy of emptiness",
            url: "nagarjuna.html"
        },

        {
            title: "Osho",
            category: "Thinkers",
            description: "Modern spiritual teacher known for meditation, consciousness, and individual freedom",
            url: "osho.html"
        },

        {
            title: "Patanjali",
            category: "Thinkers",
            description: "Classical Indian thinker associated with Yoga philosophy and the Yoga Sutras",
            url: "patanjali.html"
        },

        {
            title: "Ramanuja",
            category: "Thinkers",
            description: "Vedanta philosopher who developed the Vishishtadvaita tradition",
            url: "ramanuja.html"
        },

        {
            title: "Kapila",
            category: "Thinkers",
            description: "Ancient Indian philosopher traditionally associated with the Samkhya school",
            url: "kapila.html"
        },

        {
            title: "Madhvacharya",
            category: "Thinkers",
            description: "Vedanta philosopher and major proponent of Dvaita, or dualistic Vedanta",
            url: "madhvacharya.html"
        },

        {
            title: "Rumi",
            category: "Thinkers",
            description: "Persian poet and mystical thinker on love, spirituality, and human transformation",
            url: "rumi.html"
        },

        {
            title: "Sarvepalli Radhakrishnan",
            category: "Thinkers",
            description: "Indian philosopher and scholar of comparative religion and Indian thought",
            url: "sarvepalli-radhakrishnan.html"
        },

        {
            title: "Mahatma Gandhi",
            category: "Thinkers",
            description: "Indian thinker whose philosophy emphasized nonviolence, truth, and ethical action",
            url: "mahatma-gandhi.html"
        },

        {
            title: "Rabindranath Tagore",
            category: "Thinkers",
            description: "Indian poet and thinker on humanism, freedom, education, and universalism",
            url: "rabindranath-tagore.html"
        },

        {
            title: "Chaitanya",
            category: "Thinkers",
            description: "Indian spiritual teacher associated with devotional philosophy and Bhakti",
            url: "chaitanya.html"
        },

        {
            title: "Vatsyayana",
            category: "Thinkers",
            description: "Ancient Indian thinker traditionally associated with the Kama Sutra and the study of human relationships",
            url: "vatsyayana.html"
        },

        {
            title: "Swami Vivekananda",
            category: "Thinkers",
            description: "Indian philosopher and spiritual thinker who interpreted Vedanta for the modern world",
            url: "swami-vivekananda.html"
        },

        {
            title: "Aristotle",
            category: "Thinkers",
            description: "Greek philosopher of logic, ethics, metaphysics, politics, and natural philosophy",
            url: "aristotle.html"
        },

        {
            title: "Democritus",
            category: "Thinkers",
            description: "Greek atomist philosopher who explained reality through atoms and void",
            url: "democritus.html"
        },

        {
            title: "Diogenes",
            category: "Thinkers",
            description: "Cynic philosopher known for radical simplicity, independence, and virtue",
            url: "diogenes.html"
        },

        {
            title: "Epicurus",
            category: "Thinkers",
            description: "Greek philosopher who developed a philosophy of happiness, pleasure, and tranquility",
            url: "epicurus.html"
        },

        {
            title: "Gorgias",
            category: "Thinkers",
            description: "Greek Sophist known for rhetoric, skepticism, and arguments concerning truth and knowledge",
            url: "gorgias.html"
        },

        {
            title: "Heraclitus",
            category: "Thinkers",
            description: "Greek philosopher associated with change, becoming, and the concept of Logos",
            url: "heraclitus.html"
        },

        {
            title: "Leucippus",
            category: "Thinkers",
            description: "Early Greek atomist traditionally regarded as a founder of atomism",
            url: "leucippus.html"
        },

        {
            title: "Parmenides",
            category: "Thinkers",
            description: "Greek philosopher whose thought centered on being, reality, and the rejection of change",
            url: "parmenides.html"
        },

        {
            title: "Plato",
            category: "Thinkers",
            description: "Greek philosopher known for the Forms, justice, knowledge, and the ideal state",
            url: "plato.html"
        },

        {
            title: "Pyrrho",
            category: "Thinkers",
            description: "Greek philosopher traditionally regarded as a founder of philosophical skepticism",
            url: "pyrrho.html"
        },

        {
            title: "Pythagoras",
            category: "Thinkers",
            description: "Greek philosopher associated with mathematics, harmony, number, and the Pythagorean tradition",
            url: "pythagoras.html"
        },

        {
            title: "Thales of Miletus",
            category: "Thinkers",
            description: "Early Greek philosopher traditionally regarded as one of the first Western natural philosophers",
            url: "thales-of-miletus.html"
        },

        {
            title: "Socrates",
            category: "Thinkers",
            description: "Greek philosopher known for the Socratic method, ethical inquiry, and the examined life",
            url: "socrates.html"
        },

        {
            title: "Anaximenes",
            category: "Thinkers",
            description: "Pre-Socratic Greek philosopher who proposed air as the fundamental principle of nature",
            url: "anaximenes.html"
        },

        {
            title: "Anaximander",
            category: "Thinkers",
            description: "Pre-Socratic Greek philosopher associated with the apeiron and early cosmological thought",
            url: "anaximander.html"
        },

        {
            title: "Confucius",
            category: "Thinkers",
            description: "Chinese philosopher of ethics, education, virtue, and social harmony",
            url: "confucius.html"
        },

        {
            title: "D. T. Suzuki",
            category: "Thinkers",
            description: "Japanese Buddhist thinker who introduced Zen philosophy to Western audiences",
            url: "d-t-suzuki.html"
        },

        {
            title: "Dogen",
            category: "Thinkers",
            description: "Japanese Zen philosopher and founder of the Soto Zen tradition",
            url: "dogen.html"
        },

        {
            title: "Han Feizi",
            category: "Thinkers",
            description: "Chinese Legalist philosopher known for his theories of law, governance, and political authority",
            url: "han-feizi.html"
        },

        {
            title: "Kukai",
            category: "Thinkers",
            description: "Japanese Buddhist philosopher and founder of the Shingon tradition",
            url: "kukai.html"
        },

        {
            title: "Lao Tzu",
            category: "Thinkers",
            description: "Ancient Chinese philosopher traditionally associated with Daoism and the Dao De Jing",
            url: "lao-tzu.html"
        },

        {
            title: "Mencius",
            category: "Thinkers",
            description: "Chinese Confucian philosopher known for his theory of human nature and moral cultivation",
            url: "mencius.html"
        },

        {
            title: "Mozi",
            category: "Thinkers",
            description: "Chinese philosopher who advocated universal care, practical ethics, and social order",
            url: "mozi.html"
        },

        {
            title: "Nishida Kitaro",
            category: "Thinkers",
            description: "Japanese philosopher who developed a distinctive philosophy of experience, consciousness, and absolute nothingness",
            url: "nishida-kitaro.html"
        },

        {
            title: "Watsuji Tetsuro",
            category: "Thinkers",
            description: "Japanese philosopher known for his philosophy of human relationships, ethics, and cultural climate",
            url: "watsuji-tetsuro.html"
        },

        {
            title: "Xunzi",
            category: "Thinkers",
            description: "Chinese Confucian philosopher known for his view of human nature, ritual, and moral cultivation",
            url: "xunzi.html"
        },

        {
            title: "Zeno of Citium",
            category: "Thinkers",
            description: "Greek philosopher and founder of Stoicism, emphasizing virtue, reason, and living according to nature",
            url: "zeno-of-citium.html"
        },

        {
            title: "Zhu Xi",
            category: "Thinkers",
            description: "Chinese Neo-Confucian philosopher who systematized Confucian metaphysics, ethics, and learning",
            url: "zhu-xi.html"
        },

        {
            title: "Zhuangzi",
            category: "Thinkers",
            description: "Chinese Daoist philosopher known for reflections on freedom, transformation, perspective, and the Dao",
            url: "zhuangzi.html"
        },

        {
            title: "Al-Farabi",
            category: "Thinkers",
            description: "Islamic philosopher of reason, politics, ethics, metaphysics, and the ideal society",
            url: "al-farabi.html"
        },

        {
            title: "Al-Ghazali",
            category: "Thinkers",
            description: "Islamic theologian and philosopher known for examining reason, faith, knowledge, and spiritual life",
            url: "al-ghazali.html"
        },

        {
            title: "Al-Kindi",
            category: "Thinkers",
            description: "Early Islamic philosopher who integrated Greek philosophy with Islamic intellectual traditions",
            url: "al-kindi.html"
        },

        {
            title: "Averroes",
            category: "Thinkers",
            description: "Andalusian philosopher known for influential commentaries on Aristotle and the relationship between reason and faith",
            url: "averroes.html"
        },

        {
            title: "Avicenna",
            category: "Thinkers",
            description: "Persian philosopher and physician known for influential work in metaphysics, logic, and the philosophy of mind",
            url: "avicenna.html"
        },

        {
            title: "Ibn Arabi",
            category: "Thinkers",
            description: "Andalusian Islamic philosopher and mystic known for his metaphysics of existence and spiritual knowledge",
            url: "ibn-arabi.html"
        },

        {
            title: "Ibn Bajjah",
            category: "Thinkers",
            description: "Andalusian philosopher who explored intellect, ethics, politics, and the solitary pursuit of wisdom",
            url: "ibn-bajjah.html"
        },

        {
            title: "Ibn Khaldun",
            category: "Thinkers",
            description: "North African thinker known for his philosophy of history, society, civilization, and social change",
            url: "ibn-khaldun.html"
        },

        {
            title: "Ibn Tufayl",
            category: "Thinkers",
            description: "Andalusian philosopher known for exploring reason, knowledge, and spiritual discovery in Hayy ibn Yaqzan",
            url: "ibn-tufayl.html"
        },

        {
            title: "Mulla Sadra",
            category: "Thinkers",
            description: "Persian Islamic philosopher known for the primacy of existence and the philosophy of substantial motion",
            url: "mulla-sadra.html"
        },

        {
            title: "Nasir al-Din al-Tusi",
            category: "Thinkers",
            description: "Persian philosopher and polymath known for work in ethics, logic, astronomy, and Islamic philosophy",
            url: "nasir-al-din-al-tusi.html"
        },

        {
            title: "Suhrawardi",
            category: "Thinkers",
            description: "Persian philosopher and founder of the Illuminationist tradition of Islamic philosophy",
            url: "suhrawardi.html"
        },

        {
            title: "Fakhr al-Din al-Razi",
            category: "Thinkers",
            description: "Persian theologian and philosopher known for influential work in Islamic theology, metaphysics, and logic",
            url: "fakhr-al-din-al-razi.html"
        },

        {
            title: "Albert Camus",
            category: "Thinkers",
            description: "French philosopher and writer known for absurdism, freedom, and the search for meaning",
            url: "albert-camus.html"
        },

        {
            title: "Baruch Spinoza",
            category: "Thinkers",
            description: "Dutch philosopher known for rationalism, metaphysics, ethics, and the unity of God and nature",
            url: "baruch-spinoza.html"
        },

        {
            title: "David Hume",
            category: "Thinkers",
            description: "Scottish philosopher known for empiricism, skepticism, causation, and theories of human nature",
            url: "david-hume.html"
        },

        {
            title: "George Berkeley",
            category: "Thinkers",
            description: "Irish philosopher known for idealism and the view that reality is fundamentally constituted by perception",
            url: "george-berkeley.html"
        },

        {
            title: "Georg Wilhelm Friedrich Hegel",
            category: "Thinkers",
            description: "German idealist philosopher known for dialectics, history, freedom, and the development of consciousness",
            url: "hegel.html"
        },

        {
            title: "Immanuel Kant",
            category: "Thinkers",
            description: "German philosopher who transformed modern thought through his work on knowledge, ethics, and reason",
            url: "immanuel-kant.html"
        },

        {
            title: "Jean-Paul Sartre",
            category: "Thinkers",
            description: "French existentialist philosopher known for freedom, consciousness, responsibility, and bad faith",
            url: "jean-paul-sartre.html"
        },

        {
            title: "John Locke",
            category: "Thinkers",
            description: "English philosopher known for empiricism, natural rights, political philosophy, and theories of knowledge",
            url: "john-locke.html"
        },

        {
            title: "John Stuart Mill",
            category: "Thinkers",
            description: "British philosopher known for utilitarianism, liberty, ethics, and political philosophy",
            url: "john-stuart-mill.html"
        },

        {
            title: "Karl Marx",
            category: "Thinkers",
            description: "German philosopher and social theorist known for historical materialism, capitalism, class, and alienation",
            url: "karl-marx.html"
        },

        {
            title: "Gottfried Wilhelm Leibniz",
            category: "Thinkers",
            description: "German rationalist philosopher known for metaphysics, monads, logic, and the principle of sufficient reason",
            url: "leibniz.html"
        },

        {
            title: "Montesquieu",
            category: "Thinkers",
            description: "French political philosopher known for separation of powers, law, liberty, and political institutions",
            url: "montesquieu.html"
        },

        {
            title: "Friedrich Nietzsche",
            category: "Thinkers",
            description: "German philosopher known for critiques of morality, nihilism, religion, and the concept of the will to power",
            url: "nietzsche.html"
        },

        {
            title: "René Descartes",
            category: "Thinkers",
            description: "French philosopher and rationalist known for methodological doubt, the cogito, and mind-body dualism",
            url: "rene-descartes.html"
        },

        {
            title: "Arthur Schopenhauer",
            category: "Thinkers",
            description: "German philosopher known for his metaphysics of will, pessimism, suffering, and compassion",
            url: "schopenhauer.html"
        },

        {
            title: "Simone de Beauvoir",
            category: "Thinkers",
            description: "French philosopher and existentialist thinker known for freedom, ethics, feminism, and gender",
            url: "simone-de-beauvoir.html"
        },

        {
            title: "Søren Kierkegaard",
            category: "Thinkers",
            description: "Danish philosopher who explored existence, anxiety, faith, individuality, and the leap of faith",
            url: "soren-kierkegaard.html"
        },

        {
            title: "Thomas Hobbes",
            category: "Thinkers",
            description: "English philosopher known for social contract theory, political authority, and the state of nature",
            url: "thomas-hobbes.html"
        },

        {
            title: "Voltaire",
            category: "Thinkers",
            description: "French Enlightenment philosopher and writer known for reason, liberty, religious tolerance, and criticism of authority",
            url: "voltaire.html"
        },

        {
            title: "Adam Smith",
            category: "Thinkers",
            description: "Scottish philosopher and economist known for moral philosophy, sympathy, markets, and political economy",
            url: "adam-smith.html"
        },

        {
            title: "Francis Bacon",
            category: "Thinkers",
            description: "English philosopher associated with empiricism, scientific method, induction, and the advancement of knowledge",
            url: "francis-bacon.html"
        },

        {
            title: "Jean-Jacques Rousseau",
            category: "Thinkers",
            description: "Genevan philosopher known for social contract theory, political freedom, education, and human nature",
            url: "jean-jacques-rousseau.html"
        },

        {
            title: "Thomas Paine",
            category: "Thinkers",
            description: "Enlightenment political thinker known for republicanism, natural rights, democracy, and political liberty",
            url: "thomas-paine.html"
        },

        {
            title: "Blaise Pascal",
            category: "Thinkers",
            description: "French mathematician, scientist, and philosopher known for reflections on reason, faith, and the human condition",
            url: "blaise-pascal.html"
        },

        {
            title: "Jeremy Bentham",
            category: "Thinkers",
            description: "English philosopher and founder of modern utilitarianism, emphasizing happiness, utility, and social reform",
            url: "jeremy-bentham.html"
        },

        {
            title: "Michel Foucault",
            category: "Thinkers",
            description: "French philosopher known for analyses of power, knowledge, discourse, institutions, and social control",
            url: "michel-foucault.html"
        },

        {
            title: "Judith Butler",
            category: "Thinkers",
            description: "American philosopher known for influential work on gender, identity, performativity, and ethics",
            url: "judith-butler.html"
        },

        {
            title: "Peter Singer",
            category: "Thinkers",
            description: "Australian philosopher known for applied ethics, animal ethics, effective altruism, and global poverty",
            url: "peter-singer.html"
        },

        {
            title: "Slavoj Žižek",
            category: "Thinkers",
            description: "Slovenian philosopher and cultural theorist known for ideology, psychoanalysis, politics, and social critique",
            url: "slavoj-zizek.html"
        },

        {
            title: "Hannah Arendt",
            category: "Thinkers",
            description: "German-American political philosopher known for totalitarianism, political action, freedom, and the public realm",
            url: "hannah-arendt.html"
        },

        {
            title: "Charles Taylor",
            category: "Thinkers",
            description: "Canadian philosopher known for modern identity, recognition, secularism, and communitarian thought",
            url: "charles-taylor.html"
        },

        {
            title: "Jürgen Habermas",
            category: "Thinkers",
            description: "German philosopher and social theorist known for communicative action, democracy, and the public sphere",
            url: "jurgen-habermas.html"
        },

        {
            title: "Jacques Derrida",
            category: "Thinkers",
            description: "French philosopher and founder of deconstruction, known for examining language, meaning, and textual interpretation",
            url: "jacques-derrida.html"
        },

        {
            title: "Martha Nussbaum",
            category: "Thinkers",
            description: "American philosopher known for ethics, political philosophy, capabilities, emotions, and human flourishing",
            url: "martha-nussbaum.html"
        },

        {
            title: "Gilles Deleuze",
            category: "Thinkers",
            description: "French philosopher known for difference, becoming, desire, multiplicity, and critiques of traditional metaphysics",
            url: "gilles-deleuze.html"
        },

        {
            title: "Cornel West",
            category: "Thinkers",
            description: "American philosopher and social critic known for pragmatism, democracy, race, justice, and prophetic thought",
            url: "cornel-west.html"
        },

        {
            title: "Bernard Williams",
            category: "Thinkers",
            description: "British philosopher known for influential work in ethics, moral psychology, integrity, and philosophical skepticism",
            url: "bernard-williams.html"
        },

        {
            title: "B. R. Ambedkar",
            category: "Thinkers",
            description: "Indian philosopher, jurist, and social thinker known for his work on equality, justice, democracy, and social reform",
            url: "br-ambedkar.html"
        },

        {
            title: "Sri Aurobindo",
            category: "Thinkers",
            description: "Indian philosopher and spiritual thinker known for integral philosophy, consciousness, evolution, and human transformation",
            url: "sri-aurobindo.html"
        },

        {
            title: "Ramana Maharshi",
            category: "Thinkers",
            description: "Indian spiritual philosopher known for self-inquiry, consciousness, and the question of the true self",
            url: "ramana-maharshi.html"
        },

        {
            title: "Marcus Aurelius",
            category: "Thinkers",
            description: "Roman Stoic philosopher and emperor known for reflections on virtue, reason, duty, and resilience",
            url: "marcus-aurelius.html"
        },

        {
            title: "Niccolò Machiavelli",
            category: "Thinkers",
            description: "Italian political philosopher known for political power, statecraft, leadership, and political realism",
            url: "niccolo-machiavelli.html"
        },

        {
            title: "Albert Einstein",
            category: "Thinkers",
            description: "Theoretical physicist and influential thinker whose reflections explored science, knowledge, reality, and ethics",
            url: "albert-einstein.html"
        },

        {
            title: "Sigmund Freud",
            category: "Thinkers",
            description: "Austrian neurologist and founder of psychoanalysis known for theories of the unconscious, mind, and human behavior",
            url: "sigmund-freud.html"
        },

        {
            title: "Isaac Newton",
            category: "Thinkers",
            description: "English physicist and mathematician whose work transformed scientific thought and shaped ideas about nature and knowledge",
            url: "isaac-newton.html"
        },

        {
            title: "Saint Augustine",
            category: "Thinkers",
            description: "Christian philosopher and theologian known for influential ideas on God, time, free will, evil, and human nature",
            url: "saint-augustine.html"
        },

        {
            title: "Contact",
            category: "Library",
            description: "Contact The Great Library of Philosophy",
            url: "contact.html"
        }

    ];


    /* =========================================================
       CREATE COMMAND PALETTE
       ========================================================= */

    const palette = document.createElement("div");

    palette.className = "philosophy-command-palette";

    palette.setAttribute("aria-hidden", "true");

    palette.innerHTML = `

        <div class="command-backdrop"></div>

        <div
            class="command-window"
            role="dialog"
            aria-modal="true"
            aria-label="Philosophy command palette"
        >

            <div class="command-search">

                <span class="command-search-icon">⌕</span>

                <input
                    type="search"
                    class="command-input"
                    placeholder="Search the philosophical library..."
                    autocomplete="off"
                    spellcheck="false"
                />

                <button
                    type="button"
                    class="command-close"
                    aria-label="Close command palette"
                >
                    ESC
                </button>

            </div>


            <div class="command-results"></div>


            <div class="command-footer">

                <span>
                    <kbd>↑</kbd>
                    <kbd>↓</kbd>
                    Navigate
                </span>

                <span>
                    <kbd>Enter</kbd>
                    Open
                </span>

                <span>
                    <kbd>Esc</kbd>
                    Close
                </span>

            </div>

        </div>
    `;


    document.body.appendChild(palette);


    /* =========================================================
       ELEMENTS
       ========================================================= */

    const input =
        palette.querySelector(".command-input");

    const results =
        palette.querySelector(".command-results");

    const closeButton =
        palette.querySelector(".command-close");

    const backdrop =
        palette.querySelector(".command-backdrop");


    let selectedIndex = 0;

    let currentResults = [];


    /* =========================================================
       OPEN
       ========================================================= */

    const openPalette = () => {

        palette.classList.add("open");

        palette.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "command-palette-open"
        );

        input.value = "";

        selectedIndex = 0;

        showResults(
            philosophyPages
        );

        setTimeout(() => {
            input.focus();
        }, 50);

    };


    /* =========================================================
       CLOSE
       ========================================================= */

    const closePalette = () => {

        palette.classList.remove("open");

        palette.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "command-palette-open"
        );

    };


    /* =========================================================
       SEARCH
       ========================================================= */

    const searchPages = (query) => {

        const searchTerm =
            query
                .trim()
                .toLowerCase();

        if (!searchTerm) {

            return philosophyPages;

        }


        return philosophyPages
            .map((page) => {

                const title =
                    page.title.toLowerCase();

                const category =
                    page.category.toLowerCase();

                const description =
                    page.description.toLowerCase();


                let score = 0;


                /* Exact title */

                if (title === searchTerm) {
                    score += 100;
                }


                /* Title starts with query */

                if (title.startsWith(searchTerm)) {
                    score += 50;
                }


                /* Title contains query */

                if (title.includes(searchTerm)) {
                    score += 30;
                }


                /* Category */

                if (category.includes(searchTerm)) {
                    score += 15;
                }


                /* Description */

                if (description.includes(searchTerm)) {
                    score += 10;
                }


                return {
                    page,
                    score
                };

            })

            .filter((item) => item.score > 0)

            .sort((a, b) =>
                b.score - a.score
            )

            .map((item) =>
                item.page
            );

    };


    /* =========================================================
       DISPLAY RESULTS
       ========================================================= */

    const showResults = (pages) => {

        currentResults = pages;

        selectedIndex = 0;

        results.innerHTML = "";


        if (!pages.length) {

            results.innerHTML = `

                <div class="command-empty">

                    <strong>No philosophical path found.</strong>

                    <span>
                        Try another concept, branch, thinker,
                        era, or subject.
                    </span>

                </div>

            `;

            return;

        }


        pages.forEach((page, index) => {

            const item =
                document.createElement("button");

            item.type = "button";

            item.className =
                "command-result";


            if (index === 0) {
                item.classList.add(
                    "selected"
                );
            }


            item.innerHTML = `

                <span class="command-result-main">

                    <strong>
                        ${page.title}
                    </strong>

                    <small>
                        ${page.description}
                    </small>

                </span>

                <span class="command-result-category">
                    ${page.category}
                </span>

            `;


            item.addEventListener(
                "click",
                () => {

                    window.location.href =
                        page.url;

                }
            );


            results.appendChild(item);

        });

    };


    /* =========================================================
       UPDATE SELECTION
       ========================================================= */

    const updateSelection = () => {

        const items =
            results.querySelectorAll(
                ".command-result"
            );


        items.forEach((item, index) => {

            item.classList.toggle(
                "selected",
                index === selectedIndex
            );

        });


        const selected =
            items[selectedIndex];


        if (selected) {

            selected.scrollIntoView({
                block: "nearest"
            });

        }

    };


    /* =========================================================
       SEARCH INPUT
       ========================================================= */

    input.addEventListener(
        "input",
        () => {

            const matches =
                searchPages(input.value);

            showResults(matches);

        }
    );


    /* =========================================================
       KEYBOARD NAVIGATION
       ========================================================= */

    input.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "ArrowDown"
            ) {

                event.preventDefault();

                if (!currentResults.length)
                    return;

                selectedIndex =
                    Math.min(
                        selectedIndex + 1,
                        currentResults.length - 1
                    );

                updateSelection();

            }


            else if (
                event.key === "ArrowUp"
            ) {

                event.preventDefault();

                if (!currentResults.length)
                    return;

                selectedIndex =
                    Math.max(
                        selectedIndex - 1,
                        0
                    );

                updateSelection();

            }


            else if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                const selected =
                    currentResults[selectedIndex];

                if (selected) {

                    window.location.href =
                        selected.url;

                }

            }


            else if (
                event.key === "Escape"
            ) {

                event.preventDefault();

                closePalette();

            }

        }
    );


    /* =========================================================
       CTRL + K / CMD + K
       ========================================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                if (
                    palette.classList.contains(
                        "open"
                    )
                ) {

                    closePalette();

                } else {

                    openPalette();

                }

            }


            if (
                event.key === "Escape" &&
                palette.classList.contains(
                    "open"
                )
            ) {

                closePalette();

            }

        }
    );


    /* =========================================================
       CLOSE BUTTON
       ========================================================= */

    closeButton.addEventListener(
        "click",
        closePalette
    );


    backdrop.addEventListener(
        "click",
        closePalette
    );


})();
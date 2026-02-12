const content = {
  personal: {
    name: "Akhil Kambhatla",
    title: "Data Scientist | AI/ML Researcher",
    tagline: "Transforming complex data into actionable insights through cutting-edge machine learning and research.",
    bio: "I'm a Data Science graduate student at the University of Maryland, College Park, with a passion for solving real-world problems through machine learning and statistical analysis. With published research in computer vision and precision agriculture, I thrive on tackling challenging problems, whether it's building multi-scale feature extraction frameworks or analyzing pricing patterns across thousands of restaurant locations. Beyond data science, I bring leadership experience as a former soccer team captain, Model UN logistics head, and student mentor. When I'm not training models, you'll find me exploring new coffee blends or planning my next travel adventure.",
    email: "kakhil@umd.edu",
    emailAlt: "akhilkambhatla.work@gmail.com",
    linkedin: "https://www.linkedin.com/in/akhil-kambhatla-b4914826a/",
    github: "https://github.com/Akhil-Kambhatla",
    resumePath: "/portfolio/resume.pdf",
    profileImage: "/portfolio/profile.jpeg",
    location: "College Park, Maryland"
  },

  skills: {
    programming: ["Python", "SQL", "R", "MATLAB", "JavaScript", "React.js"],
    dsAndML: ["Scikit-learn", "PyTorch", "PySpark", "TensorFlow", "Hugging Face Transformers", "NLP", "NumPy", "Pandas", "Statistical Modeling", "SpaCy", "Feature Engineering", "Time Series Forecasting", "LightGBM", "XGBoost", "Generative AI", "LLMs", "RAG", "Web Scraping"],
    frameworksAndTools: ["FastAPI", "Spark", "Docker", "Kubernetes", "GitHub", "Jupyter Notebook", "RStudio", "Selenium", "BeautifulSoup"],
    cloudAndDB: ["AWS Lambda", "AWS S3", "AWS Bedrock", "AWS SageMaker", "MongoDB", "Databricks", "SQLite"],
    visualization: ["Power BI", "Tableau", "Matplotlib", "Seaborn", "Plotly", "Folium", "Excel"]
  },

  projects: [
    {
      title: "Fast-Food Pricing Strategy Analysis",
      category: "Data Science",
      description: "Comprehensive analysis of geographic and socioeconomic factors affecting menu prices across Chipotle, Domino's, and Papa John's locations nationwide. Scraped menu data from thousands of locations, integrated Census income data and Department of Labor minimum wage information, and applied BERT embeddings for text analysis.",
      techStack: ["Python", "Pandas", "Selenium", "BeautifulSoup", "BERT", "Scikit-learn", "Folium", "Census API", "Matplotlib", "Seaborn"],
      github: "https://github.com/Akhil-Kambhatla/Food-Pricing-Strategy",
      demo: "https://akhil-kambhatla.github.io/",
      featured: true
    },
    {
      title: "Blind Image Quality Assessment using Multi-Scale Feature Extraction",
      category: "Computer Vision",
      description: "Novel multiscale feature extraction framework using Laplacian Pyramid Networks for blind image quality assessment. Decomposes images into frequency bands to capture fine details and structural information, improving quality prediction accuracy across diverse visual distortions.",
      techStack: ["Python", "PyTorch", "Laplacian Pyramid Networks", "OpenCV", "NumPy"],
      github: "https://github.com/Akhil-Kambhatla/BIQA-using-Multi-Scale-Feature-Extraction",
      demo: null,
      featured: true
    },
    {
      title: "ARIMA vs TBATS: Superstore Sales Forecasting",
      category: "Time Series",
      description: "Comparative study of ARIMA and TBATS models for optimizing sales predictions in superstore retail. Evaluated performance using RMSE, MAE, and MAPE metrics across short and medium-term forecasting horizons.",
      techStack: ["R", "ARIMA", "TBATS", "ggplot2", "Forecasting"],
      github: "https://github.com/Akhil-Kambhatla/ARIMA-vs-TBATS",
      demo: null,
      featured: false
    },
    {
      title: "Medical Invoice Processor",
      category: "Generative AI",
      description: "AI-powered medical invoice processing system leveraging AWS Bedrock and large language models to automatically extract, parse, and structure data from medical invoices with high accuracy.",
      techStack: ["Python", "FastAPI", "AWS Bedrock", "AWS S3", "LLMs", "RAG"],
      github: "https://github.com/Akhil-Kambhatla/Medical-Invoice-Processor",
      demo: null,
      featured: true
    },
    {
      title: "Breast Cancer Classification & Model Comparison",
      category: "Machine Learning",
      description: "Built and compared multiple machine learning models to predict malignant vs benign breast cancer cases, including data preprocessing, feature selection, model training, and comprehensive performance evaluation.",
      techStack: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Jupyter"],
      github: "https://github.com/Akhil-Kambhatla/Breast-Cancer-Classification-and-Model-Comparison",
      demo: null,
      featured: false
    },
    {
      title: "Crop Recommendation System",
      category: "Machine Learning",
      description: "Machine learning system that recommends optimal crops based on soil conditions, weather parameters, and geographic data to help farmers maximize yield and make data-driven agricultural decisions.",
      techStack: ["Python", "Scikit-learn", "Pandas", "Jupyter"],
      github: "https://github.com/Akhil-Kambhatla/Crop-Recommendation-System",
      demo: null,
      featured: false
    },
    {
      title: "GNN-Based Anomaly Detection",
      category: "Deep Learning",
      description: "Graph Neural Network-based system for detecting anomalies in complex networked data, leveraging graph structure and node features to identify unusual patterns and outliers.",
      techStack: ["Python", "PyTorch", "Graph Neural Networks", "NumPy", "Jupyter"],
      github: "https://github.com/Akhil-Kambhatla/GNN-Based-Anomaly-Detection",
      demo: null,
      featured: true
    },
    {
      title: "Video Recommendation Engine",
      category: "Machine Learning",
      description: "Content-based video recommendation system using NLP techniques and TF-IDF vectorization to analyze video metadata and deliver personalized recommendations based on user preferences.",
      techStack: ["Python", "Scikit-learn", "NLP", "TF-IDF", "Pandas"],
      github: "https://github.com/Akhil-Kambhatla/video-recommendation-engine",
      demo: null,
      featured: false
    }
  ],

  publications: [
    {
      title: "Enhancing Precision Agriculture with Machine Learning and Image Processing: A Comparative Evaluation of YOLO and RCNN for Weed Identification and Detection",
      authors: "Satya Kiranmai Tadepalli, Shobarani Salvadi, Akhil Kambhatla, Kadiyala Ramana",
      venue: "Cybernetics, Human Cognition, and Machine Learning in Communicative Applications, Springer",
      year: "2025",
      status: "Published",
      abstract: "Applied machine learning and image processing to enhance precision agriculture by developing models for automated weed identification and detection. Conducted a comparative evaluation of YOLO and RCNN architectures to enable targeted pesticide application, reducing environmental damage while improving crop yield.",
      keywords: ["Precision Agriculture", "YOLO", "RCNN", "Image Processing", "Weed Detection", "Deep Learning"],
      link: "https://drive.google.com/file/d/1WvBBlP6UrXeanDbk8jX-W-jdEKcS5CFJ/view?usp=sharing",
      date: "Jan 2025"
    },
    {
      title: "Enhancing Blind Image Quality Scores using Multi-Scale Feature Extraction",
      authors: "Akhil Kambhatla, Shobarani Salvadi, Likhita Golukonda, Renu Prasad",
      venue: "8th International Conference on Inventive Computation Technologies, IEEE",
      year: "2025",
      status: "Published",
      abstract: "Proposed a novel multiscale feature extraction framework using Laplacian Pyramid Networks for blind image quality assessment. The framework decomposes images into frequency bands, capturing fine details and structural information to improve quality prediction accuracy across diverse visual distortions.",
      keywords: ["BIQA", "Laplacian Pyramid Networks", "Multi-Scale Feature Extraction", "Image Quality", "Computer Vision"],
      link: "https://drive.google.com/file/d/1oOHghI4K_G3e_Q4s35hVSwmgkEzP54J8/view?usp=sharing",
      date: "Apr 2025"
    },
    {
      title: "Optimizing Sales Predictions in Superstore Retail: A Comparative Study of ARIMA and TBATS Models",
      authors: "Akhil Kambhatla, Satya Kiranmai Tadepalli, Shashank Anchuri, Jayanth Madhav",
      venue: "EAI BDCC Conference",
      year: "2024",
      status: "In Progress",
      abstract: "Explored the forecasting capabilities of ARIMA and TBATS models using real-world Superstore retail data. Evaluated model performance using RMSE, MAE, and MAPE for short- and medium-term forecasting, providing insights for improving profitability and inventory management.",
      keywords: ["Sales Prediction", "ARIMA", "TBATS", "Time Series", "Forecasting", "Retail Analytics"],
      link: "https://drive.google.com/file/d/1v5eojXO5ujSBfC_zJ8sPuUeXrW0kq7af/view?usp=sharing",
      date: "2024"
    }
  ],

  education: [
    {
      institution: "University of Maryland, College Park",
      degree: "Master of Science in Data Science",
      dates: "Sep 2025 – May 2027",
      gpa: "3.9/4.0",
      coursework: ["Principles of Data Science", "Principles of Machine Learning", "Probability & Statistics", "Big Data", "Data Structures", "Data Representation & Modelling"],
      current: true
    },
    {
      institution: "Chaitanya Bharathi Institute of Technology",
      degree: "Bachelor of Engineering in AI & Data Science",
      dates: "Nov 2021 – May 2025",
      gpa: "8.96/10",
      coursework: ["Machine Learning", "Deep Learning", "NLP", "Artificial Intelligence", "Data Structures & Algorithms", "Database Management Systems", "Cloud Computing", "Big Data Analytics", "Computer Networks", "Software Engineering", "Business Intelligence"],
      current: false
    }
  ],

  experience: [
    {
      company: "Synkrit AI Tech Pvt Ltd.",
      role: "Python Engineer",
      location: "Hyderabad, India",
      dates: "Apr 2025 – Jun 2025",
      description: "Built the backend for a faceless AI video generation platform, orchestrating a multi-model pipeline. Used GPT-4o for story descriptions and narration scripts, then fed prompts to OpenAI's gpt-image-1 for image generation. Generated images were passed back to gpt-image-1 to edit them into different scenes while maintaining visual consistency. Integrated ElevenLabs API for audio generation with custom voice styles, automated subtitle creation, assembled video from generated frames, and synced everything together into final outputs.",
      techHighlights: ["GPT-4o", "gpt-image-1", "ElevenLabs API", "FastAPI", "Swagger UI", "Redis", "Python"],
      color: "#06b6d4"
    },
    {
      company: "Infosys Springboard 5.0",
      role: "AI Engineer Intern",
      location: "Hyderabad, India",
      dates: "Oct 2024 – Dec 2024",
      description: "Developed an integrated real-time emotion and sentiment analysis system combining facial expression analysis and speech-based sentiment detection. Used DeepFace for facial emotion recognition and Wav2Vec2 for speech-to-text conversion, followed by transformer-based sentiment classification using PyTorch. Achieved approximately 91% overall accuracy on recorded and real-time inputs.",
      techHighlights: ["DeepFace", "Wav2Vec2", "PyTorch", "Transformers", "Python"],
      color: "#8b5cf6"
    },
    {
      company: "Rinex",
      role: "Artificial Intelligence Intern",
      location: "Hyderabad, India",
      dates: "Jan 2024 – Mar 2024",
      description: "Built a weather classifier using Random Forests with optimized feature selection, raising prediction accuracy from 79% to 93% through iterative improvements. Refined models through hyperparameter tuning and feature importance analysis to overcome overfitting issues. Documented each milestone using GitHub Markdown for knowledge transfer.",
      techHighlights: ["Random Forest", "Scikit-learn", "Feature Engineering", "Python"],
      color: "#ec4899"
    },
    {
      company: "EdSpread",
      role: "Full Stack Developer Intern",
      location: "Hyderabad, India",
      dates: "Mar 2023 – May 2023",
      description: "Implemented a Student Performance Dashboard using the MERN stack, integrating MongoDB, Express, Node.js, and React. Tested and verified dashboard functionality with mock datasets, ensuring accurate data rendering and reliable performance across components.",
      techHighlights: ["MongoDB", "Express", "React", "Node.js", "MERN Stack"],
      color: "#f97316"
    }
  ],

  certifications: [],

  navLinks: [
    { name: "Home", path: "/", icon: "home" },
    { name: "Projects", path: "/projects", icon: "code" },
    { name: "Research", path: "/research", icon: "book" },
    { name: "Contact", path: "/contact", icon: "mail" }
  ]
};

export default content;

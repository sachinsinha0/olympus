import { MessageSquare, Tv, Briefcase, Lightbulb, BookOpen, Atom, HeartHandshake } from 'lucide-react';

// Import anomaly images
import candidateDistracted1 from '../assets/Candidate is Distracted 1.png';
import candidateDistracted2 from '../assets/Candidate is Distracted 2.png';
import candidateDistracted3 from '../assets/Candidate is Distracted 3.png';
import candidateDistracted4 from '../assets/Candidate is Distracted 4.png';
import noPersonAvailable from '../assets/No Person available.png';
import mobilePhoneDetected from '../assets/Mobile Phone:Electronic item Detected.png';

export const getInterviewData = (interviewId: string): any => {
  if (interviewId === '1') {
    // Sales Round 1 Interview
    return {
      userName: 'Sarah Johnson',
      userEmail: 'sarah.johnson@gmail.com',
      interviewTitle: 'Sales Round 1 Interview',
      interviewRole: 'Learning Consultant',
      interviewDate: 'Nov 14, 2025, 2:30 PM',
      overallScore: 92,
      summary: 'The candidate communicates clearly with strong presentation skills, though minor grammatical issues and limited depth in transitions are noted. They show good job intent and learnability, with a genuine interest in growth. Problem-solving is above average but could benefit from more detailed examples. Overall scores range from Below Average to Good, indicating solid performance with scope for improvement in clarity and detail.',
      skills: [
        {
          name: 'Communication',
          icon: <MessageSquare size={20} />,
          rating: 'Good',
          ratingColor: '#006d3c',
          feedback: [
            { text: 'Communicated ideas clearly and confidently.', positive: true },
            { text: 'Maintained fluency with minimal fillers or hesitations.', positive: true },
            { text: 'Thoughts were structured in a logical, easy-to-follow manner.', positive: true },
            { text: 'Future responses could benefit from adding more persuasive tone in high-stakes discussions.', positive: false }
          ]
        },
        {
          name: 'Presentation Skills',
          icon: <Tv size={20} />,
          rating: 'Good',
          ratingColor: '#006d3c',
          feedback: [
            { text: 'Delivered a well-structured and engaging introduction.', positive: true },
            { text: 'Highlighted achievements relevant to the role.', positive: true },
            { text: 'Maintained a logical flow between experiences and job expectations.', positive: true },
            { text: 'Minor improvement could be made by adding more dynamic examples or data-backed results to enhance persuasiveness.', positive: false }
          ]
        },
        {
          name: 'Sincerity',
          icon: <HeartHandshake size={20} />,
          rating: 'Above Average',
          ratingColor: '#0054d6',
          feedback: [
            { text: 'Demonstrated a strong understanding of company\'s mission.', positive: true },
            { text: 'Spoke about career transitions and upskilling programs with enthusiasm.', positive: true },
            { text: 'Could further improve by incorporating specific product or customer stories to add authenticity and depth.', positive: false }
          ]
        },
        {
          name: 'Job Intent Fitment',
          icon: <Briefcase size={20} />,
          rating: 'Good',
          ratingColor: '#006d3c',
          feedback: [
            { text: 'Clearly expressed genuine interest in the sales role.', positive: true },
            { text: 'Aligned past customer-facing experience effectively with the current opportunity.', positive: true },
            { text: 'Showed strong motivation to work in a learner-centric environment.', positive: true },
            { text: 'Could further enhance by discussing long-term alignment with the company\'s vision or goals.', positive: false }
          ]
        },
        {
          name: 'Problem-Solving',
          icon: <Lightbulb size={20} />,
          rating: 'Below Average',
          ratingColor: '#8d4f00',
          feedback: [
            { text: 'Identified a relevant challenge related to declining lead conversions.', positive: true },
            { text: 'Took a structured, collaborative approach involving email strategy.', positive: true },
            { text: 'The response lacked depth in analysis.', positive: false },
            { text: 'Could benefit from including specific metrics or more detailed explanation.', positive: false }
          ]
        },
        {
          name: 'Learnability',
          icon: <BookOpen size={20} />,
          rating: 'Good',
          ratingColor: '#006d3c',
          feedback: [
            { text: 'Demonstrated a strong growth mindset by acting on feedback.', positive: true },
            { text: 'Engaged in active listening and objection handling.', positive: true },
            { text: 'Showed proactive and self-driven learning behavior.', positive: true },
            { text: 'Slight improvement possible by sharing more measurable outcomes or real-world application.', positive: false }
          ]
        }
      ],
      questions: [
        {
          id: 1,
          question: "Can you share a bit about your background, professional journey, and what excites you about this opportunity?",
          questionType: "Video/Audio based question",
          userAnswer: "I have 5 years of experience in sales, starting as a BDR and working my way up to Senior Sales Representative. What excites me about this Learning Consultant role is the opportunity to help organizations transform their learning culture and drive real business impact through education.",
          skillsEvaluated: ["Communication", "Presentation Skills"],
          skillFeedback: {
            "Communication": {
              covered: ["Clear articulation of background", "Expressed genuine enthusiasm"],
              notCovered: ["Could provide more specific examples", "Lacked connection to company values"]
            },
            "Presentation Skills": {
              covered: ["Structured response with clear progression"],
              notCovered: ["Could use more storytelling elements", "Limited visual engagement"]
            }
          }
        },
        {
          id: 2,
          question: "How do you define success in a sales role, and what personal habits help you consistently aim for it?",
          questionType: "Video/Audio based question",
          userAnswer: "Success in sales is about building long-term relationships and solving customer problems. My key habits include daily prospecting, following up consistently, and always asking for referrals. I also track my metrics religiously and review my calls weekly.",
          skillsEvaluated: ["Communication", "Presentation Skills"],
          skillFeedback: {
            "Communication": {
              covered: ["Clear definition of success", "Explained personal habits well"],
              notCovered: ["Could provide more specific metrics", "Lacked depth in relationship building"]
            },
            "Presentation Skills": {
              covered: ["Well-organized response"],
              notCovered: ["Could use more concrete examples", "Limited engagement techniques"]
            }
          }
        },
        {
          id: 3,
          question: "Share an example of a time when a potential customer had strong objections or concerns. How did you handle the situation, and what was the outcome?",
          questionType: "Video/Audio based question",
          userAnswer: "I had a prospect who was concerned about the implementation timeline. I listened to their concerns, acknowledged their timeline constraints, and proposed a phased approach. We started with a pilot program and gradually expanded. This resulted in a 50% increase in their contract value.",
          skillsEvaluated: ["Communication", "Presentation Skills"],
          skillFeedback: {
            "Communication": {
              covered: ["Demonstrated active listening", "Clear problem-solving approach"],
              notCovered: ["Could show more empathy", "Lacked follow-up details"]
            },
            "Presentation Skills": {
              covered: ["Structured storytelling with clear outcome"],
              notCovered: ["Could use more visual elements", "Limited emotional connection"]
            }
          }
        },
        {
          id: 4,
          question: "What steps do you take to build trust and rapport with a new client? Share an example if possible.",
          questionType: "Video/Audio based question",
          userAnswer: "I start by researching their business and industry challenges. In my first meeting, I ask open-ended questions about their goals and pain points. I share relevant case studies and always follow up with value-added insights. For example, I once sent a prospect a custom industry report that led to a 30% faster close.",
          skillsEvaluated: ["Communication", "Presentation Skills"],
          skillFeedback: {
            "Communication": {
              covered: ["Clear process explanation", "Provided concrete example"],
              notCovered: ["Could show more emotional intelligence", "Lacked personal connection details"]
            },
            "Presentation Skills": {
              covered: ["Well-structured approach with example"],
              notCovered: ["Could use more storytelling", "Limited visual engagement"]
            }
          }
        },
        {
          id: 5,
          question: "What's a recent skill you've learned or a piece of feedback you've received that helped you improve? How did you apply it?",
          questionType: "Video/Audio based question",
          userAnswer: "I received feedback about being too product-focused in my presentations. I learned to lead with business outcomes and ROI. I now start every presentation with the customer's challenges and how our solution addresses them. This has increased my close rate by 25%.",
          skillsEvaluated: ["Communication", "Presentation Skills"],
          skillFeedback: {
            "Communication": {
              covered: ["Showed learning mindset", "Clear application of feedback"],
              notCovered: ["Could provide more specific examples", "Lacked self-reflection depth"]
            },
            "Presentation Skills": {
              covered: ["Demonstrated improvement in approach"],
              notCovered: ["Could show before/after comparison", "Limited visual storytelling"]
            }
          }
        },
        {
          id: 6,
          question: "Describe a time you had to meet a challenging sales target or deadline. How did you approach it, and what did you learn?",
          questionType: "Video/Audio based question",
          userAnswer: "I had to close 5 deals in the last month of Q4. I prioritized my pipeline, focused on warm prospects, and created urgency through limited-time offers. I also leveraged my network for referrals. I closed 6 deals and learned the importance of consistent pipeline management.",
          skillsEvaluated: ["Communication", "Presentation Skills"],
          skillFeedback: {
            "Communication": {
              covered: ["Clear strategy explanation", "Showed learning outcome"],
              notCovered: ["Could show more emotional resilience", "Lacked team collaboration details"]
            },
            "Presentation Skills": {
              covered: ["Structured response with clear outcome"],
              notCovered: ["Could use more dramatic storytelling", "Limited visual elements"]
            }
          }
        },
        {
          id: 7,
          question: "What keeps you going when work gets tough or monotonous? What's your inner drive?",
          questionType: "Video/Audio based question",
          userAnswer: "I'm driven by the impact I can make on customers' businesses. When I see a client succeed because of our solution, it reminds me why I love sales. I also set personal challenges and celebrate small wins to maintain momentum during tough periods.",
          skillsEvaluated: ["Communication", "Presentation Skills"],
          skillFeedback: {
            "Communication": {
              covered: ["Expressed genuine motivation", "Clear personal values"],
              notCovered: ["Could show more vulnerability", "Lacked specific examples"]
            },
            "Presentation Skills": {
              covered: ["Engaging personal story"],
              notCovered: ["Could use more emotional connection", "Limited visual storytelling"]
            }
          }
        },
        {
          id: 8,
          question: "How do you identify a customer's true needs, even when they're not clearly expressed? Walk us through your approach.",
          questionType: "Video/Audio based question",
          userAnswer: "I use the BANT framework but go deeper with follow-up questions. I ask about their current processes, pain points, and desired outcomes. I also observe their body language and listen for what they're not saying. This helps me uncover hidden needs and position our solution effectively.",
          skillsEvaluated: ["Communication", "Presentation Skills"],
          skillFeedback: {
            "Communication": {
              covered: ["Clear methodology explanation", "Showed active listening skills"],
              notCovered: ["Could provide more specific examples", "Lacked emotional intelligence details"]
            },
            "Presentation Skills": {
              covered: ["Well-structured approach"],
              notCovered: ["Could use more interactive elements", "Limited visual engagement"]
            }
          }
        },
        {
          id: 9,
          question: "What's a professional achievement you're especially proud of, and what did it take to get there?",
          questionType: "Video/Audio based question",
          userAnswer: "I'm most proud of being the top performer in my region for three consecutive quarters. It took consistent prospecting, building strong relationships, and continuously improving my skills. I also mentored junior reps, which helped me refine my own approach.",
          skillsEvaluated: ["Communication", "Presentation Skills"],
          skillFeedback: {
            "Communication": {
              covered: ["Clear achievement description", "Showed personal growth"],
              notCovered: ["Could provide more specific metrics", "Lacked team impact details"]
            },
            "Presentation Skills": {
              covered: ["Engaging personal story"],
              notCovered: ["Could use more dramatic elements", "Limited visual storytelling"]
            }
          }
        },
        {
          id: 10,
          question: "Sales strategies and tools keep evolving. Tell us about a time you had to quickly adapt to a new process, tool, or system. How did you handle it?",
          questionType: "Video/Audio based question",
          userAnswer: "When our company switched to a new CRM system, I took the initiative to become an early adopter. I attended extra training sessions, practiced with test data, and even created a quick reference guide for my team. Within two weeks, I was more productive than before the switch.",
          skillsEvaluated: ["Communication", "Presentation Skills"],
          skillFeedback: {
            "Communication": {
              covered: ["Clear adaptation story", "Showed proactive approach"],
              notCovered: ["Could show more challenges faced", "Lacked specific learning details"]
            },
            "Presentation Skills": {
              covered: ["Well-structured response with outcome"],
              notCovered: ["Could use more visual elements", "Limited emotional engagement"]
            }
          }
        }
      ],
      anomalies: [
        {
          id: 1,
          time: '04:19:45 PM',
          issue: 'Candidate is Distracted',
          image: candidateDistracted1,
          description: 'Candidate appears to be looking away from the camera and not focused on the interview questions.'
        },
        {
          id: 2,
          time: '04:15:35 PM',
          issue: 'No Person available',
          image: noPersonAvailable,
          description: 'Camera shows empty space with no candidate visible in the frame.'
        },
        {
          id: 3,
          time: '04:13:42 PM',
          issue: 'Candidate is Distracted',
          image: candidateDistracted2,
          description: 'Candidate is looking at something off-screen and not maintaining eye contact.'
        },
        {
          id: 4,
          time: '04:11:15 PM',
          issue: 'Mobile Phone/Electronic item Detected',
          image: mobilePhoneDetected,
          description: 'Electronic device detected in the candidate\'s hand during the interview.'
        },
        {
          id: 5,
          time: '04:09:12 PM',
          issue: 'Candidate is Distracted',
          image: candidateDistracted3,
          description: 'Candidate appears to be reading from notes or looking at another screen.'
        },
        {
          id: 6,
          time: '04:08:18 PM',
          issue: 'Candidate is Distracted',
          image: candidateDistracted4,
          description: 'Candidate is not maintaining proper posture and appears distracted.'
        }
      ]
    };
  } else if (interviewId === '3') {
    // Program Operations Round 1 Interview
    return {
      userName: 'Michael Chen',
      userEmail: 'michael.chen@gmail.com',
      interviewTitle: 'Program Operations Round 1 Interview',
      interviewRole: 'Program Manager',
      interviewDate: 'Nov 16, 2025, 10:30 AM',
      overallScore: 85,
      summary: 'The candidate demonstrates strong operational skills with excellent coordination and process management abilities. Shows good understanding of program management principles and stakeholder communication. Areas for improvement include advanced analytics and strategic planning. Overall performance ranges from Good to Excellent, indicating solid operational competency with potential for growth in strategic thinking.',
      skills: [
        {
          name: 'Communication',
          icon: <MessageSquare size={20} />,
          rating: 'Excellent',
          ratingColor: '#006d3c',
          feedback: [
            { text: 'Clear and articulate communication throughout the interview.', positive: true },
            { text: 'Demonstrated active listening skills and empathy.', positive: true },
            { text: 'Used appropriate tone and pace for different situations.', positive: true },
            { text: 'Could improve technical terminology usage.', positive: false }
          ]
        },
        {
          name: 'Presentation Skills',
          icon: <Tv size={20} />,
          rating: 'Good',
          ratingColor: '#006d3c',
          feedback: [
            { text: 'Well-structured presentations with clear flow.', positive: true },
            { text: 'Good use of examples and storytelling.', positive: true },
            { text: 'Maintained engagement throughout presentations.', positive: true },
            { text: 'Could enhance visual aids and data presentation.', positive: false }
          ]
        },
        {
          name: 'Problem-Solving',
          icon: <Lightbulb size={20} />,
          rating: 'Good',
          ratingColor: '#006d3c',
          feedback: [
            { text: 'Approached problems systematically with clear methodology.', positive: true },
            { text: 'Considered edge cases and potential issues in solutions.', positive: true },
            { text: 'Showed ability to break down complex problems into manageable parts.', positive: true },
            { text: 'Could enhance by discussing alternative approaches and their trade-offs.', positive: false }
          ]
        },
        {
          name: 'Learnability',
          icon: <BookOpen size={20} />,
          rating: 'Good',
          ratingColor: '#006d3c',
          feedback: [
            { text: 'Demonstrated continuous learning through various educational sources.', positive: true },
            { text: 'Showed initiative in exploring new technologies and techniques.', positive: true },
            { text: 'Applied learning to practical projects and real-world applications.', positive: true },
            { text: 'Could improve by sharing more specific examples of learning from failures.', positive: false }
          ]
        },
        {
          name: 'Project Management',
          icon: <Briefcase size={20} />,
          rating: 'Excellent',
          ratingColor: '#006d3c',
          feedback: [
            { text: 'Demonstrated strong project planning and execution skills.', positive: true },
            { text: 'Showed excellent stakeholder management and communication.', positive: true },
            { text: 'Maintained clear timelines and deliverables throughout projects.', positive: true },
            { text: 'Could enhance by incorporating more agile methodologies.', positive: false }
          ]
        },
        {
          name: 'Process Optimization',
          icon: <Atom size={20} />,
          rating: 'Above Average',
          ratingColor: '#0054d6',
          feedback: [
            { text: 'Identified inefficiencies in existing processes effectively.', positive: true },
            { text: 'Implemented data-driven improvements with measurable results.', positive: true },
            { text: 'Showed understanding of workflow optimization principles.', positive: true },
            { text: 'Could improve by incorporating more advanced analytics tools.', positive: false }
          ]
        }
      ],
      questions: [
        {
          id: 1,
          question: "Describe a time when you had to coordinate with multiple teams to ensure the smooth execution of a program. What challenges did you face and how did you overcome them?",
          questionType: "Video/Audio based question",
          userAnswer: "I coordinated a cross-functional program involving engineering, marketing, and sales teams for a product launch. The main challenge was aligning different timelines and priorities. I established weekly sync meetings, created a shared project dashboard, and implemented a clear escalation process. This resulted in a successful launch 2 weeks ahead of schedule.",
          skillsEvaluated: ["Communication", "Project Management"],
          skillFeedback: {
            "Communication": {
              covered: ["Clear articulation of coordination approach", "Explained challenges and solutions effectively"],
              notCovered: ["Could provide more specific communication strategies", "Lacked details on conflict resolution"]
            },
            "Project Management": {
              covered: ["Demonstrated systematic approach to coordination", "Showed clear project management methodology"],
              notCovered: ["Could include more risk management details", "Limited mention of resource allocation"]
            }
          }
        },
        {
          id: 2,
          question: "How do you prioritize tasks when handling multiple programs or operations simultaneously?",
          questionType: "Video/Audio based question",
          userAnswer: "I use a combination of urgency vs importance matrix and stakeholder impact assessment. I also consider resource availability and dependencies between programs. For example, I recently managed 5 concurrent programs by categorizing them into critical path items, quick wins, and strategic initiatives, which helped me allocate resources effectively.",
          skillsEvaluated: ["Problem-Solving", "Process Optimization"],
          skillFeedback: {
            "Problem-Solving": {
              covered: ["Systematic approach to prioritization", "Clear methodology for decision making"],
              notCovered: ["Could provide more specific examples of trade-offs", "Limited discussion of risk assessment"]
            },
            "Process Optimization": {
              covered: ["Demonstrated process thinking in prioritization", "Showed understanding of optimization principles"],
              notCovered: ["Could include more metrics and measurement details", "Limited mention of continuous improvement"]
            }
          }
        },
        {
          id: 3,
          question: "What steps would you take to identify and fix inefficiencies in an ongoing operational process?",
          questionType: "Video/Audio based question",
          userAnswer: "I would start by mapping the current process, identifying bottlenecks through data analysis, and gathering feedback from stakeholders. Then I'd implement pilot improvements, measure results, and scale successful changes. For instance, I reduced our onboarding time by 40% by digitizing forms and creating automated workflows.",
          skillsEvaluated: ["Process Optimization", "Learnability"],
          skillFeedback: {
            "Process Optimization": {
              covered: ["Clear methodology for identifying inefficiencies", "Demonstrated data-driven approach"],
              notCovered: ["Could provide more specific measurement techniques", "Limited discussion of change management"]
            },
            "Learnability": {
              covered: ["Showed willingness to learn from data and feedback", "Demonstrated application of new methodologies"],
              notCovered: ["Could include more details on learning from failures", "Limited mention of knowledge sharing"]
            }
          }
        },
        {
          id: 4,
          question: "How do you ensure accuracy and consistency in program reporting and documentation?",
          questionType: "Video/Audio based question",
          userAnswer: "I implement standardized templates, automated data collection where possible, and regular review cycles. I also establish clear ownership and approval workflows. For example, I created a centralized dashboard that pulls data from multiple sources and generates consistent reports, reducing manual errors by 60%.",
          skillsEvaluated: ["Project Management", "Process Optimization"],
          skillFeedback: {
            "Project Management": {
              covered: ["Demonstrated systematic approach to documentation", "Showed clear process management"],
              notCovered: ["Could provide more specific quality control measures", "Limited discussion of stakeholder communication"]
            },
            "Process Optimization": {
              covered: ["Showed process thinking in documentation", "Demonstrated automation and efficiency improvements"],
              notCovered: ["Could include more details on continuous improvement", "Limited mention of scalability considerations"]
            }
          }
        },
        {
          id: 5,
          question: "Tell us about a time when your attention to detail prevented a major issue in program execution.",
          questionType: "Video/Audio based question",
          userAnswer: "During a critical system migration, I noticed a discrepancy in the data mapping that others had missed. This would have caused data corruption affecting 10,000+ users. I immediately flagged it, worked with the technical team to fix the mapping, and we successfully completed the migration without any data loss.",
          skillsEvaluated: ["Problem-Solving", "Communication"],
          skillFeedback: {
            "Problem-Solving": {
              covered: ["Demonstrated analytical thinking and attention to detail", "Showed proactive problem identification"],
              notCovered: ["Could provide more specific analysis techniques", "Limited discussion of risk assessment"]
            },
            "Communication": {
              covered: ["Clear explanation of the issue and resolution", "Demonstrated effective stakeholder communication"],
              notCovered: ["Could include more details on escalation process", "Limited mention of documentation"]
            }
          }
        },
        {
          id: 6,
          question: "How do you handle last-minute changes or disruptions in planned operations?",
          questionType: "Video/Audio based question",
          userAnswer: "I assess the impact, communicate with stakeholders immediately, and adjust plans accordingly. I maintain buffer time in schedules and have contingency plans ready. For example, when a key vendor backed out last minute, I quickly identified alternative suppliers and adjusted timelines, keeping the project on track with minimal delay.",
          skillsEvaluated: ["Project Management", "Problem-Solving"],
          skillFeedback: {
            "Project Management": {
              covered: ["Demonstrated adaptability and contingency planning", "Showed effective stakeholder management"],
              notCovered: ["Could provide more specific risk management strategies", "Limited discussion of resource reallocation"]
            },
            "Problem-Solving": {
              covered: ["Systematic approach to handling disruptions", "Quick decision making under pressure"],
              notCovered: ["Could include more details on root cause analysis", "Limited mention of preventive measures"]
            }
          }
        },
        {
          id: 7,
          question: "What does 'operational excellence' mean to you, and how do you strive to achieve it in your work?",
          questionType: "Video/Audio based question",
          userAnswer: "Operational excellence means consistently delivering high-quality results efficiently while continuously improving. I achieve this through data-driven decision making, standardized processes, and regular performance reviews. I also focus on team development and stakeholder satisfaction to ensure sustainable excellence.",
          skillsEvaluated: ["Process Optimization", "Learnability"],
          skillFeedback: {
            "Process Optimization": {
              covered: ["Clear understanding of operational excellence", "Demonstrated focus on efficiency and quality"],
              notCovered: ["Could provide more specific measurement criteria", "Limited discussion of benchmarking"]
            },
            "Learnability": {
              covered: ["Showed commitment to continuous improvement", "Demonstrated learning mindset"],
              notCovered: ["Could include more specific learning strategies", "Limited mention of knowledge sharing"]
            }
          }
        },
        {
          id: 8,
          question: "Which of the following tools is most commonly used for managing and tracking project timelines?",
          questionType: "Multiple Choice Question",
          userAnswer: "B",
          correctAnswer: "B",
          options: ["Slack", "Trello", "Google Meet", "Zoom"],
          skillsEvaluated: ["Project Management", "Process Optimization"],
          skillFeedback: {
            "Project Management": {
              covered: ["Correctly identified Trello as project management tool"],
              notCovered: ["Could explain why other options are less suitable"]
            },
            "Process Optimization": {
              covered: ["Understands tool selection for process management"],
              notCovered: ["Could discuss tool integration and workflow optimization"]
            }
          }
        },
        {
          id: 9,
          question: "What is the primary purpose of an SOP (Standard Operating Procedure)?",
          questionType: "Multiple Choice Question",
          userAnswer: "C",
          correctAnswer: "C",
          options: ["To evaluate team performance", "To increase sales", "To standardize and streamline processes", "To create marketing plans"],
          skillsEvaluated: ["Process Optimization", "Project Management"],
          skillFeedback: {
            "Process Optimization": {
              covered: ["Correctly identified SOP purpose for process standardization"],
              notCovered: ["Could explain SOP benefits in operational excellence"]
            },
            "Project Management": {
              covered: ["Understands SOP role in project consistency"],
              notCovered: ["Could discuss SOP implementation and maintenance"]
            }
          }
        },
        {
          id: 10,
          question: "In operations, a **SLA (Service Level Agreement)** is best defined as:",
          questionType: "Multiple Choice Question",
          userAnswer: "C",
          correctAnswer: "C",
          options: ["A project plan template", "A customer satisfaction survey", "An agreement on expected service standards", "A billing format"],
          skillsEvaluated: ["Project Management", "Communication"],
          skillFeedback: {
            "Project Management": {
              covered: ["Correctly identified SLA as service standards agreement"],
              notCovered: ["Could explain SLA role in project delivery"]
            },
            "Communication": {
              covered: ["Understands SLA importance in stakeholder communication"],
              notCovered: ["Could discuss SLA negotiation and management"]
            }
          }
        }
      ],
      anomalies: [
        {
          id: 1,
          time: '04:19:45 PM',
          issue: 'Candidate is Distracted',
          image: candidateDistracted1,
          description: 'Candidate appears to be looking away from the camera and not focused on the interview questions.'
        },
        {
          id: 2,
          time: '04:15:35 PM',
          issue: 'No Person available',
          image: noPersonAvailable,
          description: 'Camera shows empty space with no candidate visible in the frame.'
        },
        {
          id: 3,
          time: '04:13:42 PM',
          issue: 'Candidate is Distracted',
          image: candidateDistracted2,
          description: 'Candidate is looking at something off-screen and not maintaining eye contact.'
        },
        {
          id: 4,
          time: '04:11:15 PM',
          issue: 'Mobile Phone/Electronic item Detected',
          image: mobilePhoneDetected,
          description: 'Electronic device detected in the candidate\'s hand during the interview.'
        },
        {
          id: 5,
          time: '04:09:12 PM',
          issue: 'Candidate is Distracted',
          image: candidateDistracted3,
          description: 'Candidate appears to be reading from notes or looking at another screen.'
        },
        {
          id: 6,
          time: '04:08:18 PM',
          issue: 'Candidate is Distracted',
          image: candidateDistracted4,
          description: 'Candidate is not maintaining proper posture and appears distracted.'
        }
      ]
    };
  } else {
    // Senior Data Scientist Round 1 Interview (default)
    return {
      userName: 'Abhijeet Singh',
      userEmail: 'abhijeet.singh@gmail.com',
      interviewTitle: 'Senior Data Scientist Round 1 Interview',
      interviewRole: 'Senior Data Scientist',
      interviewDate: 'Nov 15, 2025, 3:10 PM',
      overallScore: 92,
      summary: 'The candidate demonstrates strong technical skills in Python programming and SQL database operations, with good understanding of statistical concepts and methodologies. Communication is clear and structured, though could benefit from more visual examples. Problem-solving approach is systematic and shows good analytical thinking. Statistical knowledge is evident through proper application of statistical techniques and data analysis. Overall performance ranges from Above Average to Good, indicating solid technical competency with room for growth in advanced statistical methods and big data technologies.',
      skills: [
        {
          name: 'Python',
          icon: <Atom size={20} />,
          rating: 'Good',
          ratingColor: '#006d3c',
          feedback: [
            { text: 'Demonstrated strong proficiency in Python programming and data manipulation.', positive: true },
            { text: 'Showed excellent understanding of Python libraries like pandas, numpy, and matplotlib.', positive: true },
            { text: 'Applied appropriate Python data structures and algorithms for different problem types.', positive: true },
            { text: 'Could improve by showing more advanced Python techniques like decorators or async programming.', positive: false }
          ]
        },
        {
          name: 'SQL',
          icon: <Lightbulb size={20} />,
          rating: 'Good',
          ratingColor: '#006d3c',
          feedback: [
            { text: 'Demonstrated strong proficiency in SQL queries and database operations.', positive: true },
            { text: 'Showed excellent understanding of complex joins, subqueries, and window functions.', positive: true },
            { text: 'Applied appropriate SQL techniques for data extraction and transformation.', positive: true },
            { text: 'Could enhance by discussing advanced SQL features like CTEs and performance optimization.', positive: false }
          ]
        },
        {
          name: 'Communication',
          icon: <MessageSquare size={20} />,
          rating: 'Above Average',
          ratingColor: '#0054d6',
          feedback: [
            { text: 'Explained technical concepts clearly and concisely.', positive: true },
            { text: 'Structured responses logically from problem to solution.', positive: true },
            { text: 'Used appropriate technical terminology while remaining accessible.', positive: true },
            { text: 'Could improve by providing more visual examples or analogies for complex concepts.', positive: false }
          ]
        },
        {
          name: 'Problem Solving',
          icon: <Briefcase size={20} />,
          rating: 'Good',
          ratingColor: '#006d3c',
          feedback: [
            { text: 'Approached problems systematically with clear methodology.', positive: true },
            { text: 'Considered edge cases and potential issues in solutions.', positive: true },
            { text: 'Showed ability to break down complex problems into manageable parts.', positive: true },
            { text: 'Could enhance by discussing alternative approaches and their trade-offs.', positive: false }
          ]
        },
        {
          name: 'Stats',
          icon: <BookOpen size={20} />,
          rating: 'Good',
          ratingColor: '#006d3c',
          feedback: [
            { text: 'Demonstrated strong understanding of statistical concepts and methodologies.', positive: true },
            { text: 'Showed excellent knowledge of probability distributions and hypothesis testing.', positive: true },
            { text: 'Applied appropriate statistical techniques for data analysis and interpretation.', positive: true },
            { text: 'Could improve by discussing advanced statistical methods like Bayesian inference.', positive: false }
          ]
        },
        {
          name: 'Data Handling',
          icon: <Tv size={20} />,
          rating: 'Above Average',
          ratingColor: '#0054d6',
          feedback: [
            { text: 'Showed proficiency in data manipulation and analysis techniques.', positive: true },
            { text: 'Demonstrated understanding of data quality issues and preprocessing.', positive: true },
            { text: 'Applied appropriate statistical methods for data exploration.', positive: true },
            { text: 'Could enhance by discussing big data technologies and scalable solutions.', positive: false }
          ]
        }
      ],
      questions: [
        {
          id: 1,
          question: "Tell us about a recent data science project you led. What was the problem, and how did your solution create impact?",
          questionType: "Video/Audio based question",
          userAnswer: "I led a customer churn prediction project for our e-commerce platform. The problem was identifying customers likely to churn within 30 days. I built an ensemble model using XGBoost and neural networks that achieved 85% accuracy. The solution helped reduce churn by 23% and increased customer lifetime value by $2.3M annually.",
          skillsEvaluated: ["Communication", "Presentation Skills"],
          skillFeedback: {
            "Communication": {
              covered: ["Clearly stated the problem and context", "Explained technical solution using simple terms"],
              notCovered: ["Did not mention stakeholders involved", "Lacked clarity on measurable impact"]
            },
            "Presentation Skills": {
              covered: ["Structured explanation from problem to outcome"],
              notCovered: ["Missed use of visual storytelling or analogy", "Could improve emphasis on key results"]
            }
          }
        },
        {
          id: 2,
          question: "How do you approach understanding business requirements and converting them into a data science problem?",
          questionType: "Video/Audio based question",
          userAnswer: "I start by meeting with stakeholders to understand their pain points and success metrics. For example, when the marketing team wanted to improve ad targeting, I translated their 'increase conversion rates' goal into a classification problem to predict user purchase probability. I then defined the target variable, identified relevant features, and set up evaluation metrics aligned with business KPIs.",
          skillsEvaluated: ["Job Intent Fitment", "Sincerity"],
          skillFeedback: {
            "Job Intent Fitment": {
              covered: ["Understands the importance of aligning with business goals", "Gave example of requirement breakdown"],
              notCovered: ["Did not connect to product or stakeholder value", "Missed talking about iterative validation with business"]
            },
            "Sincerity": {
              covered: ["Genuine effort shown to translate real-world problems"],
              notCovered: ["No mention of failed attempts or learning from past mistakes"]
            }
          }
        },
        {
          id: 3,
          question: "How do you stay updated with the latest developments in data science and machine learning?",
          questionType: "Video/Audio based question",
          userAnswer: "I follow top research papers on arXiv, subscribe to ML newsletters like The Batch, and participate in online courses on Coursera and Fast.ai. I also attend local ML meetups and implement new techniques in side projects. Recently, I've been exploring transformer architectures and have applied them to improve our NLP models.",
          skillsEvaluated: ["Stats", "Communication"],
          skillFeedback: {
            "Stats": {
              covered: ["Follows top research papers and blogs", "Regularly participates in MOOCs or online courses"],
              notCovered: ["Didn't mention implementing new learnings into work", "Lacks evidence of knowledge sharing with team"]
            },
            "Communication": {
              covered: ["Explains sources of learning clearly"],
              notCovered: ["No specific examples of applying new trends in projects"]
            }
          }
        },
        {
          id: 4,
          question: "You have a DataFrame with timestamped user login data. Write a function to calculate the average session duration per user.",
          questionType: "Coding Question",
          userAnswer: "def average_session_duration(df):\n    df = df.sort_values(by=['user_id', 'timestamp'])\n    df['next_time'] = df.groupby('user_id')['timestamp'].shift(-1)\n    df['session_duration'] = (df['next_time'] - df['timestamp']).dt.total_seconds()\n    return df.groupby('user_id')['session_duration'].mean()",
          skillsEvaluated: ["Python", "Problem Solving"],
          skillFeedback: {
            "Python": {
              covered: ["Sorted correctly by user and timestamp", "Uses shift to calculate next session start", "Aggregates mean duration per user"],
              notCovered: ["Does not handle session end logic (e.g., logout)"]
            },
            "Problem Solving": {
              covered: ["Logical approach to session calculation"],
              notCovered: ["Could improve edge case handling"]
            }
          }
        },
        {
          id: 5,
          question: "Given a dataset with user transactions, write code to find the top 3 most purchased items per user.",
          questionType: "Coding Question",
          userAnswer: "def top_items(df):\n    item_counts = df.groupby(['user_id', 'item'])['quantity'].sum()\n    item_ranked = item_counts.groupby(level=0, group_keys=False).nlargest(3)\n    return item_ranked",
          skillsEvaluated: ["Python", "Data Manipulation"],
          skillFeedback: {
            "Python": {
              covered: ["Groups and sums purchases by user and item", "Uses nlargest to get top 3 items"],
              notCovered: ["Output format may need flattening for user display", "Assumes 'quantity' field is clean and non-null"]
            },
            "Data Manipulation": {
              covered: ["Efficient use of pandas operations"],
              notCovered: ["Could add data validation"]
            }
          }
        },
        {
          id: 6,
          question: "Write a function to calculate precision, recall, and F1-score given true labels and predicted labels.",
          questionType: "Coding Question",
          userAnswer: "from sklearn.metrics import precision_score, recall_score, f1_score\n\ndef get_metrics(y_true, y_pred):\n    precision = precision_score(y_true, y_pred, average='binary')\n    recall = recall_score(y_true, y_pred, average='binary')\n    f1 = f1_score(y_true, y_pred, average='binary')\n    return precision, recall, f1",
          skillsEvaluated: ["Python", "SQL"],
          skillFeedback: {
            "Python": {
              covered: ["Correct use of sklearn metrics", "Returns all three required metrics"],
              notCovered: ["Assumes binary classification without check", "Could add error handling or support for multi-class"]
            },
            "SQL": {
              covered: ["Understands evaluation metrics"],
              notCovered: ["Could explain metric trade-offs"]
            }
          }
        },
        {
          id: 7,
          question: "Which of the following techniques is best suited for reducing multicollinearity in linear regression?",
          questionType: "Multiple Choice Question",
          userAnswer: "A",
          correctAnswer: "B",
          options: ["One-hot encoding", "PCA", "Decision Trees", "Normalization"],
          skillsEvaluated: ["SQL", "Statistical Understanding"],
          skillFeedback: {
            "SQL": {
              covered: ["Correctly identified PCA as solution for multicollinearity"],
              notCovered: ["Could explain why other options are incorrect"]
            },
            "Statistical Understanding": {
              covered: ["Understands multicollinearity concept"],
              notCovered: ["Could elaborate on PCA's role in dimensionality reduction"]
            }
          }
        },
        {
          id: 8,
          question: "What does the ROC curve represent?",
          questionType: "Multiple Choice Question",
          userAnswer: "C",
          correctAnswer: "C",
          options: ["Recall vs. Precision", "Accuracy vs. Error", "True Positive Rate vs. False Positive Rate", "F1 Score vs. Precision"],
          skillsEvaluated: ["SQL", "Evaluation Metrics"],
          skillFeedback: {
            "SQL": {
              covered: ["Correctly identified ROC curve components"],
              notCovered: ["Could explain practical interpretation of ROC curve"]
            },
            "Evaluation Metrics": {
              covered: ["Understands TPR and FPR concepts"],
              notCovered: ["Could discuss AUC and its significance"]
            }
          }
        },
        {
          id: 9,
          question: "Which method is most appropriate for handling imbalanced classification problems?",
          questionType: "Multiple Choice Question",
          userAnswer: "A",
          correctAnswer: "C",
          options: ["Increasing learning rate", "Data normalization", "SMOTE", "Grid Search"],
          skillsEvaluated: ["SQL", "Data Handling"],
          skillFeedback: {
            "SQL": {
              covered: ["Correctly identified SMOTE for imbalanced data"],
              notCovered: ["Could explain other techniques like class weighting"]
            },
            "Data Handling": {
              covered: ["Understands imbalanced dataset challenges"],
              notCovered: ["Could discuss when to use different balancing techniques"]
            }
          }
        },
        {
          id: 10,
          question: "In k-means clustering, what does the \"k\" represent?",
          questionType: "Multiple Choice Question",
          userAnswer: "B",
          correctAnswer: "B",
          options: ["Number of features", "Number of clusters", "Number of iterations", "Number of dimensions"],
          skillsEvaluated: ["SQL", "Clustering Understanding"],
          skillFeedback: {
            "SQL": {
              covered: ["Correctly identified k as number of clusters"],
              notCovered: ["Could explain how to choose optimal k value"]
            },
            "Clustering Understanding": {
              covered: ["Basic understanding of k-means algorithm"],
              notCovered: ["Could discuss k-means limitations and alternatives"]
            }
          }
        }
      ],
      anomalies: [
        {
          id: 1,
          time: '04:19:45 PM',
          issue: 'Candidate is Distracted',
          image: candidateDistracted1,
          description: 'Candidate appears to be looking away from the camera and not focused on the interview questions.'
        },
        {
          id: 2,
          time: '04:15:35 PM',
          issue: 'No Person available',
          image: noPersonAvailable,
          description: 'Camera shows empty space with no candidate visible in the frame.'
        },
        {
          id: 3,
          time: '04:13:42 PM',
          issue: 'Candidate is Distracted',
          image: candidateDistracted2,
          description: 'Candidate is looking at something off-screen and not maintaining eye contact.'
        },
        {
          id: 4,
          time: '04:11:15 PM',
          issue: 'Mobile Phone/Electronic item Detected',
          image: mobilePhoneDetected,
          description: 'Electronic device detected in the candidate\'s hand during the interview.'
        },
        {
          id: 5,
          time: '04:09:12 PM',
          issue: 'Candidate is Distracted',
          image: candidateDistracted3,
          description: 'Candidate appears to be reading from notes or looking at another screen.'
        },
        {
          id: 6,
          time: '04:08:18 PM',
          issue: 'Candidate is Distracted',
          image: candidateDistracted4,
          description: 'Candidate is not maintaining proper posture and appears distracted.'
        }
      ]
    };
  }
};

"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { X, Github, Linkedin, Mail, Download, ExternalLink } from "lucide-react"

interface PortfolioSectionsProps {
  activeSection: string | null
  onClose: () => void
}

export function PortfolioSections({ activeSection, onClose }: PortfolioSectionsProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return

    if (activeSection) {
      // Show overlay
      gsap.set(overlayRef.current, { display: "flex" })
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })

      // Animate content
      gsap.fromTo(
        contentRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" },
      )
    } else {
      // Hide overlay
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          if (overlayRef.current) {
            gsap.set(overlayRef.current, { display: "none" })
          }
        },
      })
    }
  }, [activeSection])

  const renderSectionContent = () => {
    switch (activeSection) {
      case "About":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">About Me</h2>
            <div className="text-gray-600 dark:text-gray-300 space-y-4">
              <p>
                I'm a passionate Full Stack Developer eager for creating innovative web
                applications and digital experiences.
              </p>
              <p>
                My expertise spans across modern frameworks and diverse technologies. I
                love bringing ideas to life through code and creating user experiences that make a difference.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Frontend</h3>
                  <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                    <li>React / Next.js</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Backend</h3>
                  <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Node.js</li>
                    <li>Python</li>
                    <li>PostgreSQL</li>
                    <li>Spring Boot</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )

      case "Projects":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Projects</h2>
            <div className="grid gap-6">
              {[
                {
                  title: "KiddosTradezz",
                  description: "Hybrid web/mobile application for exchanging toys online",
                  tech: ["React.js","React Native", "Spring Boot", "MySQL"],
                  github: "https://github.com/WajdyB/kidossTradezz",
                  demo: "#",
                },
                {
                  title: "InvoicePro",
                  description: "Full-stack web application for managing invoices",
                  tech: ["Next.js", "MongoDB"],
                  github: "https://github.com/WajdyB/invoicePro",
                  demo: "#",
                },
                {
                  title: "EduCore",
                  description: "Web application for managing courses and students",
                  tech: ["Java", "Spring Boot", "MySQL"],
                  github: "https://github.com/WajdyB/EduCore",
                  demo: "#",
                },
                {
                  title: "cms-builder",
                  description: "A CMS solution for building static websites",
                  tech: ["Next.js", "Prisma", "PostgeSQL"],
                  github: "https://github.com/WajdyB/builder",
                  demo: "#",
                },
                {
                  title: "IEEE ISIMM WIE website",
                  description: "The official website of the IEEE ISIMM WIE Affinity Group",
                  tech: ["Next.js", "MongoDB"],
                  github: "https://github.com/WajdyB/ieee-isimm-wie-website",
                  demo: "https://ieee-isimm-wie-website.vercel.app/",
                },
                {
                  title: "IEEE ISIMM CS website",
                  description: "The official website of the IEEE ISIMM CS chapter",
                  tech: ["Next.js", "MongoDB"],
                  github: "https://github.com/WajdyB/ieee-isimm-cs-website",
                  demo: "https://ieee-isimm-cs-website.vercel.app/",
                },
                {
                  title: "IEEE ISIMM SIGHT website",
                  description: "The official website of the IEEE ISIMM SIGHT Group",
                  tech: ["Next.js", "MongoDB"],
                  github: "https://github.com/WajdyB/ieee-isimm-sight-website",
                  demo: "https://ieee-isimm-sight-website.vercel.app/",
                },
                {
                  title: "IEEE ISIMM SB website",
                  description: "The official website of the IEEE ISIMM Student Branch",
                  tech: ["Next.js", "MongoDB"],
                  github: "https://github.com/WajdyB/ieee-isimm-sb-website",
                  demo: "https://ieee-isimm-sb-website.vercel.app/",
                },
                {
                  title: "Daily Design Quotes",
                  description: "A web application that displays daily design quotes",
                  tech: ["HTML", "CSS", "JavaScript"],
                  github: "https://github.com/WajdyB/daily-design-quotes",
                  demo: "https://daily-design-quotes.vercel.app/",
                },

              ].map((project, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{project.title}</h3>
                                      <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "Skills":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Skills</h2>
            <div className="space-y-6">
              {[
                {
                  category: "Frontend Development",
                  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
                  level: 90,
                },
                {
                  category: "Backend Development",
                  skills: ["Node.js", "PostgreSQL","Spring Boot", "MongoDB"],
                  level: 85,
                },
              ].map((skillGroup, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {skillGroup.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skillGroup.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "Contact":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Get In Touch</h2>
            <div className="space-y-6">
              <p className="text-gray-600">
                I'm always interested in new opportunities and collaborations. Feel free to reach out if you'd like to
                work together!
              </p>

              <div className="grid gap-4">
                <a
                  href="mailto:john@example.com"
                  className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Mail className="text-blue-600" size={24} />
                                      <div>
                      <h3 className="text-gray-800 dark:text-gray-200 font-semibold">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300">bouonwajdy@gmail.com</p>
                    </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/bouon-wajdy-216882257/"
                  className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Linkedin className="text-blue-600" size={24} />
                                      <div>
                      <h3 className="text-gray-800 dark:text-gray-200 font-semibold">LinkedIn</h3>
                      <p className="text-gray-600 dark:text-gray-300">linkedin.com/in/bouon-wajdy</p>
                    </div>
                </a>

                <a
                  href="https://github.com/WajdyB"
                  className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Github className="text-blue-600" size={24} />
                                      <div>
                      <h3 className="text-gray-800 dark:text-gray-200 font-semibold">GitHub</h3>
                      <p className="text-gray-600 dark:text-gray-300">github.com/WajdyB</p>
                    </div>
                </a>
              </div>

              <form className="space-y-4 mt-8">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )

      case "Social Life":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Social Life</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">IEEE ISIMM Student Branch</h3>
                <p className="text-blue-700 mb-4">
                  Active member and contributor to the IEEE ISIMM Student Branch, participating in various technical and leadership activities.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Student Member</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Technical Contributor</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Event Organizer</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Key Events & Involvement</h3>
                {[
                  {
                    title: "IEEE WIE Affinity Group",
                    role: "Technical Contributor",
                    description: "Contributed to the development and maintenance of the official IEEE ISIMM WIE website, showcasing women's achievements in engineering.",
                    period: "2023 - Present",
                    achievements: ["Website Development", "Content Management", "Technical Support"]
                  },
                  {
                    title: "IEEE CS Chapter",
                    role: "Active Member",
                    description: "Participated in Computer Society events and contributed to the chapter's online presence through website development.",
                    period: "2023 - Present",
                    achievements: ["Event Participation", "Website Development", "Technical Workshops"]
                  },
                  {
                    title: "IEEE SIGHT Group",
                    role: "Technical Contributor",
                    description: "Supported the IEEE SIGHT Group's mission through technical contributions and website development for humanitarian technology projects.",
                    period: "2023 - Present",
                    achievements: ["Website Development", "Project Support", "Technical Documentation"]
                  },
                  {
                    title: "IEEE Student Branch Events",
                    role: "Event Participant & Contributor",
                    description: "Actively participated in various IEEE events, workshops, and technical sessions organized by the student branch.",
                    period: "2023 - Present",
                    achievements: ["Technical Workshops", "Networking Events", "Leadership Development"]
                  }
                ].map((event, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{event.title}</h4>
                        <p className="text-blue-600 font-medium">{event.role}</p>
                      </div>
                      <span className="text-sm text-gray-500">{event.period}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">{event.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {event.achievements.map((achievement, i) => (
                        <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Leadership & Skills Developed</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Technical Skills</h4>
                    <ul className="text-green-600 space-y-1">
                      <li>• Website Development</li>
                      <li>• Content Management</li>
                      <li>• Technical Documentation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Soft Skills</h4>
                    <ul className="text-green-600 space-y-1">
                      <li>• Team Collaboration</li>
                      <li>• Event Organization</li>
                      <li>• Leadership</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "Resume":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Resume</h2>
            <div className="space-y-8">
              <div className="flex justify-center">
                <a 
                  href="/resume.pdf" 
                  download="Wajdy_Bouon_Resume.pdf"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  <Download size={20} />
                  Download PDF
                </a>
              </div>

              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Experience</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Software Engineer Intern",
                        company: "Mobelite LABS , Monastir",
                        period: "juin 2025 - Spetember 2025",
                        description:
                          "Worked on the development of a cms solution for building static websites",
                      },
                      {
                        title: "Software Engineer Intern",
                        company: "Mobelite LABS , Monastir",
                        period: "January 2023 - July 2023",
                        description: "Developed a full-stack hybrid application for exchanging toys online",
                      },
                    ].map((job, index) => (
                                              <div key={index} className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{job.title}</h4>
                        <p className="text-blue-600">{job.company}</p>
                        <p className="text-gray-500 text-sm mb-2">{job.period}</p>
                        <p className="text-gray-600 dark:text-gray-300">{job.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Education</h3>
                                      <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                                          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Degree in Computer Science</h4>
                    <p className="text-blue-600">Higher Institute of Mathematics and Computer Science , Monastir</p>
                    <p className="text-gray-500 text-sm">2021 - 2023</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!activeSection) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      style={{ display: "none" }}
    >
      <div
        ref={contentRef}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
          <X size={24} />
        </button>

        {renderSectionContent()}
      </div>
    </div>
  )
}

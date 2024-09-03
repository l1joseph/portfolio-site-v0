
import Image from 'next/image';
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <CodeIcon className="h-6 w-6" />
          <span className="sr-only">Leo Joseph&apos;s Portfolio</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Home
          </Link>
          <Link href="#projects" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Projects
          </Link>
          <Link href="#skills" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Skills
          </Link>
          <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section id="hero" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Hi, I&apos;m Leo Joseph</h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Passionate about applying machine learning to solve complex biological problems. Currently developing computational tools for microbiome studies at Knight Lab, UCSD.
                  </p>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  When I&apos;m not a student, I like to drink coffee, take photos, and pursue athletic endevours.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#projects"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    View Projects
                  </Link>
                  <Link
                    href="#contact"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Contact Me
                  </Link>
                </div>
              </div>
              <Image
                src="/leo_halfmarathon.jpeg"
                width={0}
                height={0}
                alt="Leo Joseph at half marathon"
                sizes="100vw"
                className="w-auto h-auto max-w-none max-h-none rounded-xl transform scale-120"
                style={{ transform: 'scale(.8)' }}
                priority
              />
            </div>
          </div>
        </section>
        {/* <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Featured Projects</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Check out my work</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  These are some of the projects I&apos;ve worked on during my time at UCSD.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Qupid - Microbiome Analysis Tool</CardTitle>
                  <CardDescription>A software tool for case-control matching in microbiome studies.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Scikit-Bio</Badge>
                    <Badge variant="secondary">QIIME 2</Badge>
                    <Badge variant="secondary">Jupyter Notebooks</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://github.com/gibsramen/qupid"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    View Project
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                 <CardHeader>
                   <CardTitle>KnightGPT</CardTitle>
                   <CardDescription>A microbiome specific Graph-Retrieval Augmented Generation system that enhances language models.</CardDescription>
                 </CardHeader>
                 <CardContent>
                   <div className="flex items-center gap-2">
                   <Badge variant="secondary">Large Language Models</Badge>
                   <Badge variant="secondary">Graph-RAG</Badge>
                   <Badge variant="secondary">Ollama</Badge>

                   </div>
                 </CardContent>
                 <CardFooter>
                   <Link
                     href="https://github.com/l1joseph/knightGPT"
                     className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                     prefetch={false}
                   >
                     View Project
                   </Link>
                 </CardFooter>
               </Card>
              <Card>
                <CardHeader>
                  <CardTitle>HRD Detection Algorithm</CardTitle>
                  <CardDescription>Machine learning algorithm to detect Homologous Recombination Deficiency from RNA-seq data of breast and ovarian cancer data.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Machine Learning</Badge>
                    <Badge variant="secondary">RNA-seq</Badge>
                    <Badge variant="secondary">Cancer Biology</Badge>
                    <Badge variant="secondary">R</Badge>

                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://github.com/l1joseph/Multiscale_HRD_Classifier"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    View Project
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>IDEA (Interactive Differential Expression Analysis)</CardTitle>
                  <CardDescription>Python package designed for performing differential expression analysis on gene expression data. (Designed as a Python equivalent to DESeq2)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Python packaging & distribution</Badge>
                    <Badge variant="secondary">DESEQ2</Badge>
                    <Badge variant="secondary">R</Badge>

                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://github.com/l1joseph/IDEA"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    View Project
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Skywalker V2 Prosthetic Arm</CardTitle>
                  <CardDescription>A low-cost prosthetic arm with EMG signal processing and machine learning-driven motion control.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Additive Manufacturing</Badge>
                    <Badge variant="secondary">PyTorch</Badge>
                    <Badge variant="secondary">Arduino</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://bmes.ucsd.edu"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    View Project
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section> */}
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Featured Projects</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Check out my work</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Here are some of the projects I&apos;ve worked on during my time at UCSD.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-8xl items-stretch gap-6 py-12 md:grid-cols-3 lg:gap-12">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Qupid - Microbiome Analysis Tool</CardTitle>
                  <CardDescription>A software tool for case-control matching in microbiome studies.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">Scikit-Bio</Badge>
                    <Badge variant="secondary">QIIME 2</Badge>
                    <Badge variant="secondary">Jupyter Notebooks</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://github.com/gibsramen/qupid"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    View Project
                  </Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>KnightGPT</CardTitle>
                  <CardDescription>A microbiome specific Graph-Retrieval Augmented Generation system that enhances language models.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">Large Language Models</Badge>
                    <Badge variant="secondary">Graph-RAG</Badge>
                    <Badge variant="secondary">Ollama</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://github.com/l1joseph/knightGPT"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    View Project
                  </Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>HRD Detection Algorithm</CardTitle>
                  <CardDescription>Machine learning algorithm to detect Homologous Recombination Deficiency from RNA-seq data of breast and ovarian cancer data.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">Machine Learning</Badge>
                    <Badge variant="secondary">RNA-seq</Badge>
                    <Badge variant="secondary">Cancer Biology</Badge>
                    <Badge variant="secondary">R</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://github.com/l1joseph/Multiscale_HRD_Classifier"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    View Project
                  </Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>IDEA (Interactive Differential Expression Analysis)</CardTitle>
                  <CardDescription>Python package designed for performing differential expression analysis on gene expression data. (Designed as a Python equivalent to DESeq2)</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">Python packaging & distribution</Badge>
                    <Badge variant="secondary">DESEQ2</Badge>
                    <Badge variant="secondary">R</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://github.com/l1joseph/IDEA"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    View Project
                  </Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Skywalker V2 Prosthetic Arm</CardTitle>
                  <CardDescription>A low-cost prosthetic arm with EMG signal processing and machine learning-driven motion control.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">Additive Manufacturing</Badge>
                    <Badge variant="secondary">PyTorch</Badge>
                    <Badge variant="secondary">Arduino</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://bmes.ucsd.edu"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    View Project
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section id="skills" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">My Skills</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Technologies I work with</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;m proficient in a variety of programming languages and tools used in bioinformatics and software development.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Programming Languages</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">R</Badge>
                  <Badge variant="secondary">Java</Badge>
                  <Badge variant="secondary">C++</Badge>
                </div>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Machine Learning</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">TensorFlow/Keras</Badge>
                  <Badge variant="secondary">PyTorch</Badge>
                  <Badge variant="secondary">scikit-learn</Badge>
                </div>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Web Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">HTML/CSS</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Flask</Badge>
                  <Badge variant="secondary">Django</Badge>
                  <Badge variant="secondary">D3.js</Badge>
                </div>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Bioinformatics Tools</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">BIRDMAn</Badge>
                  <Badge variant="secondary">Quita</Badge>
                  <Badge variant="secondary">Qiime2</Badge>
                  <Badge variant="secondary">BLAST</Badge>
                  <Badge variant="secondary">HMMER</Badge>
                  <Badge variant="secondary">Biopython</Badge>
                  <Badge variant="secondary">Samtools</Badge>
                </div>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Cloud Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">AWS</Badge>
                  <Badge variant="secondary">Azure</Badge>
                </div>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Version Control</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Git</Badge>
                  <Badge variant="secondary">GitHub</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">About Me</div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  My Educational and Professional Background
                </h2>
                <div className="prose">
                  <p>
                    I&apos;m a bioinformatics-focused developer currently studying at the University of California, San Diego
                    (UCSD). I&apos;m pursuing a Bachelor&apos;s degree in Bioengineering: Bioinformatics, expected to graduate in June 2025.
                  </p>
                  <p>
                    My experience spans from academic research to industry internships. At the Knight Lab at UCSD, I&apos;ve been working on 
                    microbiome studies. I primarily focus on Autism Spectrum Disorder (ASD), using advanced machine learning and bioinformatics techniques to identify and diagnose ASD using the gut microbiome. 
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Education</div>
                <div className="grid gap-8">
                  <div>
                    <h3 className="text-lg font-bold">University of California, San Diego</h3>
                    <p className="text-muted-foreground">Bachelor of Science in Bioengineering: Bioinformatics</p>
                    <p className="text-muted-foreground">Expected Graduation: June 2025</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Relevant Experience</h3>
                    <ul className="list-disc pl-4 text-muted-foreground">
                      <li>Knight Lab - UCSD (Dec 2023 - Present)</li>
                      <li>Kaiser Permanente Intern (Jun 2023 - Sep 2023)</li>
                      <li>Clear Labs R&D Intern (Jun 2021 - Aug 2021)</li>
                      <li>Cisco Software Engineer Intern (Jun 2021 - Aug 2021)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Relevant Coursework</h3>
                    <ul className="list-disc pl-4 text-muted-foreground">
                      <li>Design & Analysis of Algorithms</li>
                      <li>Applied Genomic Technologies</li>
                      <li>Advanced Bioinformatics Lab</li>
                      <li>Supervised Machine Learning Algorithms</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get in Touch</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="https://github.com/l1joseph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-all duration-300 ease-in-out hover:bg-secondary hover:text-secondary-foreground hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  GitHub
                </Link>
                <Link
                  href="https://linkedin.com/in/leo-j-joseph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-all duration-300 ease-in-out hover:bg-secondary hover:text-secondary-foreground hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  LinkedIn
                </Link>
                <Link
                  href="mailto:l1joseph@ucsd.edu"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-all duration-300 ease-in-out hover:bg-secondary hover:text-secondary-foreground hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  Email
                </Link>
                <Link
                  href="https://www.instagram.com/l.eo.j/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-all duration-300 ease-in-out hover:bg-secondary hover:text-secondary-foreground hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  Instagram
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Leo Joseph. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6" />
      </footer> */}
      <footer className="w-full py-6 border-t">
        <div className="container max-w-7xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">&copy; 2024 Leo Joseph. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6" />
        </div>
      </footer>
    </div>
  )
}

function CodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}












import Image from 'next/image';
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { CodeIcon } from 'lucide-react';

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="#" className="flex items-center justify-center mr-4" prefetch={false}>
            <CodeIcon className="h-6 w-6" />
            <span className="sr-only">Leo Joseph&apos;s Portfolio</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60" prefetch={false}>Home</Link>
            <Link href="#projects" className="transition-colors hover:text-foreground/80 text-foreground/60" prefetch={false}>Projects</Link>
            <Link href="#skills" className="transition-colors hover:text-foreground/80 text-foreground/60" prefetch={false}>Skills</Link>
            <Link href="#about" className="transition-colors hover:text-foreground/80 text-foreground/60" prefetch={false}>About</Link>
            <Link href="#contact" className="transition-colors hover:text-foreground/80 text-foreground/60" prefetch={false}>Contact</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section id="hero" className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Hi, I&apos;m Leo Joseph</h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Passionate about applying machine learning to solve complex biological problems. Currently developing computational tools for microbiome studies at Knight Lab, UCSD.
                  </p>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    When I&apos;m not a student, I like to drink coffee, take photos, and pursue athletic endeavors.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#projects"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    View Projects
                  </Link>
                  <Link
                    href="#contact"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Contact Me
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
              <Image
                  src="/leo_halfmarathon.jpeg"
                  alt="Leo Joseph at half marathon"
                  width={400}
                  height={400}
                  className="w-auto h-auto rounded-xl object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Featured Projects</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Check out my work</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Here are some of the projects I&apos;ve worked on during my time at UCSD.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle>Qupid - Microbiome Analysis Tool</CardTitle>
                  <CardDescription>A software tool for case-control matching in microbiome studies.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">Scikit-Bio</Badge>
                    <Badge variant="secondary">QIIME 2</Badge>
                    <Badge variant="secondary">Jupyter Notebooks</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://github.com/gibsramen/qupid"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    View Project
                  </Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>KnightGPT</CardTitle>
                  <CardDescription>A microbiome specific Graph-Retrieval Augmented Generation system that enhances language models.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">Large Language Models</Badge>
                    <Badge variant="secondary">Graph-RAG</Badge>
                    <Badge variant="secondary">Ollama</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://github.com/l1joseph/knightGPT"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    View Project
                  </Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>HRD Detection Algorithm</CardTitle>
                  <CardDescription>Machine learning algorithm to detect Homologous Recombination Deficiency from RNA-seq data of breast and ovarian cancer data.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">Machine Learning</Badge>
                    <Badge variant="secondary">RNA-seq</Badge>
                    <Badge variant="secondary">Cancer Biology</Badge>
                    <Badge variant="secondary">R</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://github.com/l1joseph/Multiscale_HRD_Classifier"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    View Project
                  </Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>IDEA (Interactive Differential Expression Analysis)</CardTitle>
                  <CardDescription>Python package designed for performing differential expression analysis on gene expression data. (Designed as a Python equivalent to DESeq2)</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">Python packaging & distribution</Badge>
                    <Badge variant="secondary">DESEQ2</Badge>
                    <Badge variant="secondary">R</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://github.com/l1joseph/IDEA"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    View Project
                  </Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Skywalker V2 Prosthetic Arm</CardTitle>
                  <CardDescription>A low-cost prosthetic arm with EMG signal processing and machine learning-driven motion control.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">Additive Manufacturing</Badge>
                    <Badge variant="secondary">PyTorch</Badge>
                    <Badge variant="secondary">Arduino</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://bmes.ucsd.edu"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    View Project
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section id="skills" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">My Skills</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Technologies I work with</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;m proficient in a variety of programming languages and tools used in bioinformatics and software development.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Programming Languages</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">R</Badge>
                  <Badge variant="secondary">Java</Badge>
                  <Badge variant="secondary">C++</Badge>
                </div>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Machine Learning</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">TensorFlow/Keras</Badge>
                  <Badge variant="secondary">PyTorch</Badge>
                  <Badge variant="secondary">scikit-learn</Badge>
                </div>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Web Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">HTML/CSS</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Flask</Badge>
                  <Badge variant="secondary">Django</Badge>
                  <Badge variant="secondary">D3.js</Badge>
                </div>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Bioinformatics Tools</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">BIRDMAn</Badge>
                  <Badge variant="secondary">Quita</Badge>
                  <Badge variant="secondary">Qiime2</Badge>
                  <Badge variant="secondary">BLAST</Badge>
                  <Badge variant="secondary">HMMER</Badge>
                  <Badge variant="secondary">Biopython</Badge>
                  <Badge variant="secondary">Samtools</Badge>
                </div>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Cloud Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">AWS</Badge>
                  <Badge variant="secondary">Azure</Badge>
                </div>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Version Control</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Git</Badge>
                  <Badge variant="secondary">GitHub</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">About Me</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Educational & Professional Background
                </h2>
                <div className="prose max-w-none">
                  <p>
                    I&apos;m a bioinformatics-focused developer currently studying at the University of California, San Diego
                    (UCSD). I&apos;m pursuing a Bachelor&apos;s degree in Bioengineering: Bioinformatics, expected to graduate in June 2025.
                  </p>
                  <p>
                    My experience spans from academic research to industry internships. At the Knight Lab at UCSD, I&apos;ve been working on 
                    microbiome studies. I primarily focus on Autism Spectrum Disorder (ASD), using advanced machine learning and bioinformatics techniques to identify and diagnose ASD using the gut microbiome. 
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Education</div>
                <div className="grid gap-8">
                  <div>
                    <h3 className="text-lg font-bold">University of California, San Diego</h3>
                    <p className="text-muted-foreground">Bachelor of Science in Bioengineering: Bioinformatics</p>
                    <p className="text-muted-foreground">Expected Graduation: June 2025</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Relevant Experience</h3>
                    <ul className="list-disc pl-4 text-muted-foreground">
                      <li>Knight Lab - UCSD (Dec 2023 - Present)</li>
                      <li>Kaiser Permanente Intern (Jun 2023 - Sep 2023)</li>
                      <li>Clear Labs R&D Intern (Jun 2021 - Aug 2021)</li>
                      <li>Cisco Software Engineer Intern (Jun 2021 - Aug 2021)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Relevant Coursework</h3>
                    <ul className="list-disc pl-4 text-muted-foreground">
                      <li>Design & Analysis of Algorithms</li>
                      <li>Applied Genomic Technologies</li>
                      <li>Advanced Bioinformatics Lab</li>
                      <li>Supervised Machine Learning Algorithms</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get in Touch</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="https://github.com/l1joseph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  GitHub
                </Link>
                <Link
                  href="https://linkedin.com/in/leo-j-joseph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  LinkedIn
                </Link>
                <Link
                  href="mailto:l1joseph@ucsd.edu"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Email
                </Link>
                <Link
                  href="https://www.instagram.com/l.eo.j/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Instagram
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 border-t">
        <div className="container px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">&copy; 2024 Leo Joseph. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6" />
        </div>
      </footer>
    </div>
  );
}

function CodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}





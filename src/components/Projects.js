// import Image from 'next/image';
// import Link from "next/link";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// const Projects = () => {
//     return (
//         <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Featured Projects</div>
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Check out my work</h2>
//                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   Here are some of the projects I&apos;ve worked on during my time at UCSD.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
//               <Card className="flex flex-col h-full">
//                 <CardHeader>
//                   <CardTitle>Qupid - Microbiome Analysis Tool</CardTitle>
//                   <CardDescription>A software tool for case-control matching in microbiome studies.</CardDescription>
//                 </CardHeader>
//                 <CardContent className="flex-grow">
//                   <div className="flex flex-wrap items-center gap-2">
//                     <Badge variant="secondary">Scikit-Bio</Badge>
//                     <Badge variant="secondary">QIIME 2</Badge>
//                     <Badge variant="secondary">Jupyter Notebooks</Badge>
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Link
//                     href="https://github.com/gibsramen/qupid"
//                     className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//                     prefetch={false}
//                   >
//                     View Project
//                   </Link>
//                 </CardFooter>
//               </Card>
//               <Card className="flex flex-col">
//                 <CardHeader>
//                   <CardTitle>KnightGPT</CardTitle>
//                   <CardDescription>A microbiome specific Graph-Retrieval Augmented Generation system that enhances language models.</CardDescription>
//                 </CardHeader>
//                 <CardContent className="flex-grow">
//                   <div className="flex flex-wrap items-center gap-2">
//                     <Badge variant="secondary">Large Language Models</Badge>
//                     <Badge variant="secondary">Graph-RAG</Badge>
//                     <Badge variant="secondary">Ollama</Badge>
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Link
//                     href="https://github.com/l1joseph/knightGPT"
//                     className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//                     prefetch={false}
//                   >
//                     View Project
//                   </Link>
//                 </CardFooter>
//               </Card>
//               <Card className="flex flex-col">
//                 <CardHeader>
//                   <CardTitle>HRD Detection Algorithm</CardTitle>
//                   <CardDescription>Machine learning algorithm to detect Homologous Recombination Deficiency from RNA-seq data of breast and ovarian cancer data.</CardDescription>
//                 </CardHeader>
//                 <CardContent className="flex-grow">
//                   <div className="flex flex-wrap items-center gap-2">
//                     <Badge variant="secondary">Machine Learning</Badge>
//                     <Badge variant="secondary">RNA-seq</Badge>
//                     <Badge variant="secondary">Cancer Biology</Badge>
//                     <Badge variant="secondary">R</Badge>
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Link
//                     href="https://github.com/l1joseph/Multiscale_HRD_Classifier"
//                     className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//                     prefetch={false}
//                   >
//                     View Project
//                   </Link>
//                 </CardFooter>
//               </Card>
//               <Card className="flex flex-col">
//                 <CardHeader>
//                   <CardTitle>IDEA (Interactive Differential Expression Analysis)</CardTitle>
//                   <CardDescription>Python package designed for performing differential expression analysis on gene expression data. (Designed as a Python equivalent to DESeq2)</CardDescription>
//                 </CardHeader>
//                 <CardContent className="flex-grow">
//                   <div className="flex flex-wrap items-center gap-2">
//                     <Badge variant="secondary">Python packaging & distribution</Badge>
//                     <Badge variant="secondary">DESEQ2</Badge>
//                     <Badge variant="secondary">R</Badge>
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Link
//                     href="https://github.com/l1joseph/IDEA"
//                     className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//                     prefetch={false}
//                   >
//                     View Project
//                   </Link>
//                 </CardFooter>
//               </Card>
//               <Card className="flex flex-col">
//                 <CardHeader>
//                   <CardTitle>Skywalker V2 Prosthetic Arm</CardTitle>
//                   <CardDescription>A low-cost prosthetic arm with EMG signal processing and machine learning-driven motion control.</CardDescription>
//                 </CardHeader>
//                 <CardContent className="flex-grow">
//                   <div className="flex flex-wrap items-center gap-2">
//                     <Badge variant="secondary">Additive Manufacturing</Badge>
//                     <Badge variant="secondary">PyTorch</Badge>
//                     <Badge variant="secondary">Arduino</Badge>
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Link
//                     href="https://bmes.ucsd.edu"
//                     className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//                     prefetch={false}
//                   >
//                     View Project
//                   </Link>
//                 </CardFooter>
//               </Card>
//             </div>
//           </div>
//         </section>
//     )
// }

// export default Projects



//adds hover to cards when mouseover
'use client';

import { motion } from 'framer-motion';
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const ProjectCard = ({ title, description, tags, link }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="bg-card rounded-lg overflow-hidden shadow-lg"
  >
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary">{tag}</Badge>
        ))}
      </div>
      <Link
        href={link}
        className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition duration-300"
      >
        View Project
      </Link>
    </div>
  </motion.div>
)

const projectsData = [
  {
    title: "Qupid - Microbiome Analysis Tool",
    description: "A software tool for case-control matching in microbiome studies.",
    tags: ["Scikit-Bio", "QIIME 2", "Jupyter Notebooks"],
    link: "https://github.com/gibsramen/qupid"
  },
  {
    title: "KnightGPT",
    description: "A microbiome specific Graph-Retrieval Augmented Generation system that enhances language models.",
    tags: ["Large Language Models", "Graph-RAG", "Ollama"],
    link: "https://github.com/l1joseph/knightGPT"
  },
  {
    title: "HRD Detection Algorithm",
    description: "Machine learning algorithm to detect Homologous Recombination Deficiency from RNA-seq data of breast and ovarian cancer data.",
    tags: ["Machine Learning", "RNA-seq", "Cancer Biology", "R"],
    link: "https://github.com/l1joseph/Multiscale_HRD_Classifier"
  },
  {
    title: "IDEA (Interactive Differential Expression Analysis)",
    description: "Python package designed for performing differential expression analysis on gene expression data. (Designed as a Python equivalent to DESeq2)",
    tags: ["Python packaging & distribution", "DESEQ2", "R"],
    link: "https://github.com/l1joseph/IDEA"
  },
  {
    title: "Skywalker V2 Prosthetic Arm",
    description: "A low-cost prosthetic arm with EMG signal processing and machine learning-driven motion control.",
    tags: ["Additive Manufacturing", "PyTorch", "Arduino"],
    link: "https://bmes.ucsd.edu"
  }
];

const Projects = () => {
    return (
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
              {projectsData.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </div>
        </section>
    )
}

export default Projects
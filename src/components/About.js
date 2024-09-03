import Image from 'next/image';
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const About = () => {
  return (
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
  )
}

export default About
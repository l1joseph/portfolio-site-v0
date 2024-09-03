import Image from 'next/image';
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SkillsVisualization from '../components/SkillsVisualization';


const Skills = () => {
    return (
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

            {/* <div className="mt-12 max-w-4xl mx-auto">
                <SkillsVisualization />
            </div> */}

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
    )
}

export default Skills
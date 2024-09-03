import Image from 'next/image';
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
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
  )
}

export default HeroSection
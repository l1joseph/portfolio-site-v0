export interface SkillGroup {
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    items: ['Python', 'R', 'Bash', 'C', 'C++', 'Java', 'JavaScript', 'Rust', 'SQL']
  },
  {
    title: 'ML / Data Science',
    items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Jax']
  },
  {
    title: 'Bioinformatics',
    items: ['QIIME2', 'BLAST', 'Bowtie', 'BWA', 'DESeq2', 'GATK', 'SAMtools', 'STAR', 'BIRDMAn', 'HMMER']
  },
  {
    title: 'Workflow / Infra',
    items: ['Nextflow', 'Snakemake', 'SLURM', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Git']
  },
  {
    title: 'Visualization',
    items: ['ggplot2', 'matplotlib', 'seaborn', 'D3.js']
  },
  {
    title: 'Databases / Web',
    items: ['MongoDB', 'Flask', 'React', 'SvelteKit']
  }
];

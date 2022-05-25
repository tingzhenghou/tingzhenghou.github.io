---
layout: archive
title: "Research"
permalink: /research/
author_profile: true
---

{% include base_path %}

<style>
    .res-text {
        text-align: justify;
    }
    .res {
        float: right;
        width: 60%;
    }
    @media only screen and (max-width: 800px) and (orientation:portrait) {
        .res {
            width: 100%;
        }
    }
</style>

<div class="res-text">
Theoretical calculation tools have played an irreplaceable role in materials research. By using multiscale and high-throughput calculation methods, my research mainly focuses on the key scientific problems related to the interfacial interactions and reactions in energy storage materials.
</div>
 
## Interfacial Interactions in Lithium–Sulfur Battery Cathodes

<div class="res-text">
<img class="res" src="/images/resLiS.jpg" alt="Li bond vs H bond"/>
<p>
The lithium–sulfur battery is a promising high-energy-density storage system. One of the major issues hindering its practical application is the solvation and diffusion of lithium polysulfide intermediates, which in combination with the subsequent paradox reactions is known as the shuttle effect. One widely investigated approach to suppress the shuttle effect is to anchor these intermediates using heteroatom-doped nanocarbon. However, the understanding of the related mechanism is still deficient. I use density functional theory (DFT) to model the interactions between various heteroatoms-doped nanocarbon materials and lithium polysulfides, and propose design rules for the doped carbon. Using the theoretical framework, I systematically quantify the binding energy between nitrogen-, oxygen-, boron-, fluorine-, sulfur-, phosphorous-, and chloride-doped graphene nanoribbons and lithium polysulfides, and its relationship with the electronegativity of the dopants. To further explain the calculated strong dipole–dipole interactions between electron-rich dopants (e.g., pyridinic nitrogen) and polysulfides, I apply the lithium bond theory to reveal the electrostatic origin. In close collaboration with experimentalists, I work on the identification of the lithium bond in lithium–sulfur batteries using quantum chemistry and <sup>7</sup>Li nuclear magnetic resonance (NMR) spectroscopy. This direct comparison between the theatrical predictions and experimental observations enables the development of a quantitative descriptor for the lithium bond strength, which further severs as a predictor of the corresponding electrochemical performance. This work highlights the importance of lithium bond chemistry in regulating the interfacial interactions in lithium–sulfur cathodes, which is helpful for the rational design and practical applications of lithium–sulfur batteries.
</p>
</div>

## Additives for Lithium-Ion Battery Electrolytes

<div class="res-text">
<img class="res" src="/images/resFEC.jpg" alt="Solvation structures with FEC additives"/>
<p>
There is intense interest in developing new anode materials that store a higher density of lithium. However, an unstable solid electrolyte interphase (SEI) of emerging silicon and lithium metal anodes poses obstacles to their practical applications, due to the large volume expansion of silicon and the dendritic growth of lithium. Electrolyte additives have recently been proposed as an effective approach that significantly enhances the strength and stability of the as-formed SEI film. However, the exact mechanism through which additives alter the electrolyte decomposition and SEI formation process remains unclear. My colleagues and I use classical molecular dynamics, Fourier-transform infrared spectroscopy, and quantum chemical calculations to investigate the influence of additives on the solvation structure and reduction behavior of lithium-ion battery electrolytes. Albeit minor species, additives can significantly modify the properties of electrolytes. The aim of this work is to provide mechanistic insights into the critical role of additives in tailoring the solvation structure of Li<sup>+</sup> and as-formed protective SEI composition that will aid in the rational design of novel electrolytes. Up to now, I have explored electrolyte additives including fluoroethylene carbonate (FEC) and the <a href="https://silatronix.com/products-os3/" target="_blank">OS3&reg; family solvent</a>.
</p>
</div>

## High-Throughput Molecular Dynamics Simulations and Screening of Electrolytes

<div class="res-text">
<img class="res" src="/images/resHTMD.png" alt="High-throughput MD"/>
<p>
Despite the extensive employment of electrolytes with mixed solvents, ions, and additives, the role of each ingredient with regard to the solvation structure, transport properties, and reduction behavior is not fully understood. Without a clear comprehension of the intrinsic chemistry, the conventional Edisonian approach for electrolyte development has been inefficient, impeding the demanding application of high-capacity energy storage systems. Hence, there is a pressing need to develop a coherent computational framework that can evaluate or predict the key properties of electrolytes. My colleagues and I work on the development of high-throughput infrastructure to automate the force field generation, file and database I/O, job management, and results analysis of molecular dynamics simulations of electrolyte systems. The workflows have been applied to obtain energy-storage relevant properties of a class of lithium-ion battery electrolytes consisting of binary/ternary-mixed carbonates. The continued development and iteration of the infrastructure will aid in screening optimal electrolytes in terms of composition, mass ratio, and concentration for specific battery applications.
</p>
</div>

## Modeling and Design of Novel Solid-State Electrolytes

<div class="res-text">
Solid-state electrolytes (SSEs) with high mechanical strength and ionic conductivity are anticipated to revolutionize the energy storage industry. This is due to their significant contributions to improved safety, low-temperature performance, and volumetric energy density as compared to conventional liquid electrolytes. However, the detailed ionic transport mechanisms, and how exactly the species in the SSE matrix cooperatively facilitate the cation diffusion are still unclear. I use molecular dynamics simulations as well as quantum chemistry and grand canonical Monte Carlo to study the ionic conduction mechanism of SSEs at the atomistic level, which is challenging to obtain from experimental measurements. The aim of this work is to develop accurate theoretical models that can predict and optimize the cation transport properties in SSEs, and to provide guidance for experimental efforts on possible improvements. I am currently focusing on the modeling of a particular type of SSEs based on anionic metal–organic frameworks (MOFs) to understand the roles of the anionic framewrok and the mixing solvent in the ion transport of lithium-ion batteries.
</div>

<script src="/assets/js/vanilla-back-to-top.min.js"></script>
<script>addBackToTop({
  diameter: 56,
  backgroundColor: '#ddd',
  textColor: '#003262',
  innerHTML: '<svg viewBox="0 0 24 24"><path d="M177 255.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 351.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 425.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1zm-34-192L7 199.7c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l96.4-96.4 96.4 96.4c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9l-136-136c-9.2-9.4-24.4-9.4-33.8 0z"></path></svg>'
})</script>

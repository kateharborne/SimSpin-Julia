var documenterSearchIndex = {"docs":
[{"location":"#SimSpin.jl-Documentation-1","page":"SimSpin.jl Documentation","title":"SimSpin.jl Documentation","text":"","category":"section"},{"location":"#Usage-1","page":"SimSpin.jl Documentation","title":"Usage","text":"","category":"section"},{"location":"#","page":"SimSpin.jl Documentation","title":"SimSpin.jl Documentation","text":"For the installation procedure of the SimSpin package please follow the installation instructions on the package's README.","category":"page"},{"location":"#","page":"SimSpin.jl Documentation","title":"SimSpin.jl Documentation","text":"Once installed, a simple procedure of three steps is required to take an observation and generate a datacube:","category":"page"},{"location":"#","page":"SimSpin.jl Documentation","title":"SimSpin.jl Documentation","text":"Create a telescope object. This specifies the field of view to be used, the aperture shape, etc. In this example we will use the default SAMI telescope constructor. Alternatively, the IFU() constructor can be used to create any generic IFU.\n> telescope = SimSpin.SAMI()\nRead in the simulation's particle data\n> sim_data = SimSpin.sim_data(\"path/to/SimSpin/example/SimSpin_example.hdf5\")\nBuild the datacube as a combination of a telescope, the galaxy particle data and some observation parameters (galaxy redshift, inclination and virial radius).\n> datacube = SimSpin.build_datacube(sim_data, telescope, 0.05, 70, 200)","category":"page"},{"location":"#Functions-1","page":"SimSpin.jl Documentation","title":"Functions","text":"","category":"section"},{"location":"#","page":"SimSpin.jl Documentation","title":"SimSpin.jl Documentation","text":"build_datacube\nflux_grid\nifu_cube\nobs_data_prep\nsim_data","category":"page"},{"location":"#SimSpin.build_datacube","page":"SimSpin.jl Documentation","title":"SimSpin.build_datacube","text":"build_datacube(galaxy_data, observation, ifu, blur)\n\nReturns a simulated ifu datacube for input, galaxy_data, an array of Particle. Observational variables used are as specified in Observation and IFU types. Blurring can be added if desired using Blur type.\n\nParameters:\n\ngalaxy_data         Array of `Particle` describing galaxy\nifu                 Struct of type `Telescope`\nz                   The projected redshift at which the observation is made.\ninc_deg             The inclination at which to observe the galaxy in degrees.\nr200                The virial radius specified in the simulation, kpc.\nblur                Optional. Struct of type `Blur`. If omitted no blurring occurs.\n\n\n\n\n\n","category":"function"},{"location":"#SimSpin.flux_grid","page":"SimSpin.jl Documentation","title":"SimSpin.flux_grid","text":"flux_grid(parts_in_cell,\n            observe,\n            filter)\n\nComputes the fluxes for each element of the IFU data-cube.\n\nThe purpose of this function is to construct the mock flux values within each cell of the IFU cube. It accepts output parameters from obs_data_prep() and returns a 3D array containing the flux at each cell position due to contributions from the particles. If ssd particles are supplied, an SED is generated in each cell using ProSpect. Else, the luminosity in each cell is converted to flux.\n\nParameters:\n\nparts_in_cell       1D array of the particles corresponding to each element in the IFU data-cube.\nobserve             Struct of type `Observation` containing all observation parameters.\nfilter              If ssp particles are supplied, the filter within which the SED is generated.\n                    Options include \"r\" and \"g\"  for SDSS-r and SDSS-g bands respectively.\n\n\n\n\n\n","category":"function"},{"location":"#SimSpin.ifu_cube","page":"SimSpin.jl Documentation","title":"SimSpin.ifu_cube","text":"ifu_cube(flux_grid,\n            parts_in_cell,\n            observe)\n\nThe purpose of this function is to construct an IFU data cube. It accepts a flux grid in the format output by the flux_grid() function and returns a similar, IFU-like, 3D array where each particle's flux contributes a Gaussian distribution in the velocity axis.\n\nParameters:\n\nflux_grid       Flux grid output by `flux_grid()`\nparts_in_cell   1D array of the particles corresponding to each element in the IFU data-cube.\nobserve         Struct of type `Observation` containing all observation parameters.\n\n\n\n\n\n","category":"function"},{"location":"#SimSpin.obs_data_prep","page":"SimSpin.jl Documentation","title":"SimSpin.obs_data_prep","text":"obs_data_prep(galaxy_data, observation, ifu)\n\nThis function prepares the particle data for a given observation with the given telescope.\n\nReturns:\n\ngalaxy_data         Array of particle data formatted for the observation specified by the parameters.\nparts_in_cell       3D array of the particles corresponding to each element in the IFU data-cube.\nobserved            Struct of type `Observation` containing all observation parameters.\n\nParameters:\n\ngalaxy_data         Array of `Particle` describing galaxy\nifu                 Struct of type `Telescope`\nz                   The projected redshift at which the observation is made.\ninc_deg             The inclination at which to observe the galaxy in degrees.\nr200                The virial radius specified in the simulation, kpc.\n\n\n\n\n\n","category":"function"},{"location":"#SimSpin.sim_data","page":"SimSpin.jl Documentation","title":"SimSpin.sim_data","text":"sim_data(filename;\n        pytpe = [],\n        ssp = false)\n\nReads in a SimSpin format HDF5 file at location, filename. Returns array of Sim_particles.\n\nKeyword arguments (optional):\n\nptype       A vector of the particles types to be read in e.g. ptype = [1,3].\n            If omitted all particles types will be read.\nssp         Boolean value to use ssp particle information.\n\n\n\n\n\n","category":"function"},{"location":"#Constructors-1","page":"SimSpin.jl Documentation","title":"Constructors","text":"","category":"section"},{"location":"#Telescope-Constructors-1","page":"SimSpin.jl Documentation","title":"Telescope Constructors","text":"","category":"section"},{"location":"#","page":"SimSpin.jl Documentation","title":"SimSpin.jl Documentation","text":"IFU","category":"page"},{"location":"#SimSpin.IFU","page":"SimSpin.jl Documentation","title":"SimSpin.IFU","text":"IFU(fov, ap_shape, pixel_sscale, pixel_vscale, central_wvl, lsf_fwhm, filter)\n\nCreates a mock IFU telescope which can be used to \"observe\" simulations.\n\nParameters:\n\nfov             The field of view of the IFU, diameter in arcseconds.\nap_shape        The shape of the field of view, with options \"circular\", \"square\" or \"hexagonal\".\ncentral_wvl     The central filter wavelength used for the observation, given in angstroms.\nlsf_fwhm        The line spread function full-width half-max, given in angstroms.\npixel_sscale    The corresponding spatial pixel scale associated with a given telescope output in arcseconds.\npixel_vscale    The corresponding velocity pixel scale associated with a given telescope filter output in angstroms.\nfilter          Optional. If particles type is ssp, the filter within which the SED is generated. Options include \"r\" and \"g\"  for SDSS-r and SDSS-g bands respectively.\n\n\n\n\n\n","category":"type"},{"location":"#Blur-Constructors-1","page":"SimSpin.jl Documentation","title":"Blur Constructors","text":"","category":"section"},{"location":"#","page":"SimSpin.jl Documentation","title":"SimSpin.jl Documentation","text":"Gaussian_blur\nMoffat_blur","category":"page"},{"location":"#SimSpin.Gaussian_blur","page":"SimSpin.jl Documentation","title":"SimSpin.Gaussian_blur","text":"Gaussian_blur(;sigma, fwhm)\n\nCreate a struct containing seeing information.\n\nKeyword arguments (at least one must be specified, sigma is prioritised):\n\nsigma       The standard deviation of the point spread function\nfwhm        The full width half max of the point spread function\n\n\n\n\n\n","category":"type"},{"location":"#SimSpin.Moffat_blur","page":"SimSpin.jl Documentation","title":"SimSpin.Moffat_blur","text":"Moffat_blur(β;\n            α,\n            fwhm)\n\nCreate a struct containing seeing information. β and either α or fwhm must be specified. If both α and fwhm are specified, α is prioritised.\n\nArguments:\n\nβ           The power component in the Moffat distribution\nα           The core width of the Moffat distribution (optional)\nfwhm        The full width half max of the Moffat distribution (optional)\n\n\n\n\n\n","category":"type"},{"location":"#Dark-Matter-Constructors-1","page":"SimSpin.jl Documentation","title":"Dark Matter Constructors","text":"","category":"section"},{"location":"#","page":"SimSpin.jl Documentation","title":"SimSpin.jl Documentation","text":"Hernquist\nNFW","category":"page"},{"location":"#SimSpin.Hernquist","page":"SimSpin.jl Documentation","title":"SimSpin.Hernquist","text":"Hernquist(;dm_mass = 186.9,\n            dm_a = 34.5)\n\nCreates a Hernquist analytic dark matter mass potential. Default values are shown above.\n\n\n\n\n\n","category":"type"},{"location":"#SimSpin.NFW","page":"SimSpin.jl Documentation","title":"SimSpin.NFW","text":"NFW(;dm_vm = 186.9,\n        dm_a = 34.5,\n        dm_rhof = 0.035)\n\nCreates an NFW analytic dark matter mass potential. Default values are shown above.\n\n\n\n\n\n","category":"type"},{"location":"#Multi-Threading-1","page":"SimSpin.jl Documentation","title":"Multi-Threading","text":"","category":"section"},{"location":"#","page":"SimSpin.jl Documentation","title":"SimSpin.jl Documentation","text":"The SimSpin package has multi-threading enabled in some critical functions. To use SimSpin with x threads (where x is the integer number of threads desired) you must call","category":"page"},{"location":"#","page":"SimSpin.jl Documentation","title":"SimSpin.jl Documentation","text":"export JULIA_NUM_THREADS=x","category":"page"},{"location":"#","page":"SimSpin.jl Documentation","title":"SimSpin.jl Documentation","text":"in a Terminal before the Julia REPL is started. This environment variable defaults to 1 if not set before the session has begun.","category":"page"},{"location":"#Data-Input-Format-1","page":"SimSpin.jl Documentation","title":"Data Input Format","text":"","category":"section"},{"location":"#","page":"SimSpin.jl Documentation","title":"SimSpin.jl Documentation","text":"Here we outline the expected file format accepted by SimSpin.  If you would like to generate this file automatically, a short Python function has been written that uses the pynbody package to read in various simulation data types and generate a SimSpin compatible HDF5 file. See create_SimSpinFile.","category":"page"},{"location":"#","page":"SimSpin.jl Documentation","title":"SimSpin.jl Documentation","text":"If you would rather generate the SimSpin file independently, the expected file format is outlined below.","category":"page"},{"location":"#","page":"SimSpin.jl Documentation","title":"SimSpin.jl Documentation","text":"> SimSpin_example.hdf5\n\n>> /PartType0           # Each particle type included in the simulation has its own group.\n>>> /PartType0/Mass     # Each group then has a series of data sets assocaited,\n>>> /PartType0/vx       #   including the position, velocity and Mass of each particle.\n>>> /PartType0/vy\n>>> /PartType0/vz\n>>> /PartType0/x\n>>> /PartType0/y\n>>> /PartType0/z\n\n>> /PartType1\n>>> ...","category":"page"},{"location":"#","page":"SimSpin.jl Documentation","title":"SimSpin.jl Documentation","text":"We use the same PartType definition as Gadget: PartTypeX where 0 - gas, 1 - dark matter, 2 - disc, 3 - bulge, 4 - stars. For PartType0-3, each PartType group contains the same data sets as above. If the simulation contains stars, the Age and Metallicity information for each particle is also included:","category":"page"},{"location":"#","page":"SimSpin.jl Documentation","title":"SimSpin.jl Documentation","text":"> SimSpin_example.hdf5\n>> /PartType4\n>>> /PartType4/Age\n>>> /PartType4/Mass\n>>> /PartType4/Metallicity\n>>> /PartType4/vx        \n>>> /PartType4/vy\n>>> /PartType4/vz\n>>> /PartType4/x\n>>> /PartType4/y\n>>> /PartType4/z","category":"page"},{"location":"#","page":"SimSpin.jl Documentation","title":"SimSpin.jl Documentation","text":"If the file is set up in this way, the simulation data can easily be read into the SimSpin package.","category":"page"},{"location":"#References-1","page":"SimSpin.jl Documentation","title":"References","text":"","category":"section"},{"location":"#","page":"SimSpin.jl Documentation","title":"SimSpin.jl Documentation","text":"A. Pontzen, R Roskar, G. Stinson and R. Woods, (2013), \"pynbody: N-Body/SPH analysis for python\",  Astrophysics Source Code Library, record ascl:1305.002","category":"page"}]
}

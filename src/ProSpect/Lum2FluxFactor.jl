# Date created: 10/01/2020
# Julia Conversion: Gerry Gralton
# Original author: Aaron Robotham

function Lum2FluxFactor(;z::Float64=0.1,
                        H0::Float64=67.8,
                        omegaM::Float64=0.308,
                        omegaL::Float64=1-omegaM,
                        ref::Union{String, Nothing}=nothing)


    Dl_cm = celestial.cosdistLumDist(z, H0, omegaM, omegaL, ref) * mpc_to_cm
    factor = lsol_to_erg / (4 * π * Dl_cm^2) / (1 + z)

    return factor
end

function Lum2FluxFactor(z::Float64,
                        lumDist::Float64)


    Dl_cm = lumDist * mpc_to_cm
    factor = lsol_to_erg / (4 * π * Dl_cm^2) / (1 + z)

    return factor
end

function Lum2Flux(wave::Array{Float64,1},
                    lum::Array{Float64,1};
                    z::Float64=0.1,
                    H0::Float64=67.8,
                    omegaM::Float64=0.308,
                    omegaL::Float64=1-omegaM,
                    ref::Union{String, Nothing}=nothing)

    Dl_cm = celestial.cosdistLumDist(z, H0, omegaM, omegaL, ref) * mpc_to_cm
    flux = lum * lsol_to_erg / (4 * π * Dl_cm^2) / (1 + z)
    wave = wave * (1 + z)

    return wave, flux
end

function Lum2Flux(wave::Array{Float64,1},
                    lum::Array{Float64,1},
                    z::Float64,
                    lumDist::Float64)

    Dl_cm = lumDist * mpc_to_cm
    flux = lum * lsol_to_erg / (4 * π * Dl_cm^2) / (1 + z)
    wave = wave * (1 + z)

    return wave, flux
end

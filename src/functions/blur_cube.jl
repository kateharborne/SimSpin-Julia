# Date created: 13/01/2019
# Julia Conversion: Gerry Gralton
# Original author: Katherine Harborne

using ImageFiltering

"""
    blur_cube(ifu_cube,
                blur,
                ap_region,
                sbin,
                vbin,
                ang_size,
                sbinsize)

    Takes an IFU cube generated by `ifu_cube()` and convolves it with a
    point spread function kernel as specified by the blur argument.
"""
function blur_cube(ifu_cube::Array{Float64, 3},
                    blur::Blur,
                    observe::Observation)

    @warn("SimSpin's Julia implementation will not return the same blurring results as those given in the SimSpin R package.")

    if (observe.sbin < 25 && (observe.sbin % 2) != 0)
        psf_dim = observe.sbin
    elseif (observe.sbin < 25 && (observe.sbin % 2) == 0)
        psf_dim = observe.sbin-1
    else psf_dim = 25
    end

    if typeof(blur) == Gaussian_blur
        sd_scaled = blur.sigma * observe.ang_size / observe.sbinsize # sd scaled to image pixel dimensions
        kernel = Kernel.gaussian((sd_scaled, sd_scaled), (psf_dim, psf_dim))
    elseif typeof(blur) == Moffat_blur
        kernel = Kernel.moffat(blur.α, blur.β, psf_dim)
        kernel = kernel .* moffat_scale(1., blur)
    else
        error("Blur type:", typeof(blur), "is not supported.")
    end

    blur_cube = zeros(Float64, (observe.sbin, observe.sbin, observe.vbin))

    for bin in 1:observe.vbin
        blur_cube[:,:,bin] = imfilter(ifu_cube[:,:,bin], kernel)
        blur_cube[:,:,bin] = blur_cube[:,:,bin] .* observe.ap_region #Set all cells outside aperture to zero
    end

    return blur_cube
end

function moffat_scale(mag::Float64, blur::Moffat_blur)  #This scale function is the same as the one used in ICRAR/ProFit repo.
    lumtot = pi * blur.α^2/(blur.β - 1)
    magtot = -2.5 * log10(lumtot)
    scale = 1/(10^(0.4 * (mag - magtot)))
    return scale
end

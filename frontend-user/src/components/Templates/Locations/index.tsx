import React from 'react'
import "@/styles/templates-global.css";
import "./location.css"
import InsuranceLogos from '@/components/Home/InsuranceLogos';
import BecomeProviderForm from '@/components/FormComponent/BecomePorivder/BecomeForm';
import Image from 'next/image';
import Link from 'next/link';

export default async function LoactionsTemplate({ data }: any) {
    // console.log("data", JSON.stringify(data.locationContent));
    return (
        <>
            <div className="locations">

                <div className="breadcrumbs">
                    <div className="container">
                        <div className="breadcrumbs1">
                            <a className="homes" href="/">
                                Home
                            </a>
                            <img
                                alt=""
                                loading="lazy"
                                width={24}
                                height={24}
                                decoding="async"
                                data-nimg={1}
                                // className="chevron-right-double-icon"
                                style={{ color: "transparent" }}
                                src="/templates/chevronrightdouble.svg"
                            />
                            <a className="thank-you1">{data.breadcrumbTitle}</a>
                        </div>
                    </div>
                </div>
                <section className="container">
                    <div className="area-we-served px-0">
                        
                            <h3 className=" area-we-served-title">{data.bannerTitle}</h3>
                        
                        {data.locationContent && data.locationContent.map((item: any, index: any) => {
                            return (
                                <>
                                <div className='w-100'>
                                   
                                        <h2 className="area-we-served1 text-center">{item.pageSubHeading}</h2>
                                  
                                    <div className="location-grid-col">
                                        {data.locationContent[index].location.map((locationItem: any, ele: any) => {
                                            return (
                                                <>
                                                    <div className="location-grid-item">
                                                        <Image
                                                            className="column-items-icon"
                                                            loading="lazy"
                                                            alt=""
                                                            src="/templates/frame-1686564363.svg"
                                                            width={24}
                                                            height={24}
                                                        />
                                                        <Link href={`${locationItem.links}`} className="location-name">{locationItem.items}</Link>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                    {item.browseBtnText && 
                                    <div className="button-container text-center mt-md-5 mt-sm-4 mt-3">
                                        <button className="button1 text-white">
                                            <Link href={item.browseBtnLink} className="browse-all-locations fw-semibold text-white">{item.browseBtnText}</Link>
                                        </button>
                                    </div>}
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </section>
                {/* <section className="container pt-md-3 pt-2">
                    <div className="area-we-served px-0">
                        <div className="py-md-5 py-4">
                            <h2 className="area-we-served1 text-center">Areas We Serve in Orange County</h2>
                        </div>
                        <div className="location-grid-col">
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />
                                <div className="location-name">Aliso Viejo</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Anaheim</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Brea</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Buena Park</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Costa Mesa</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Orange County</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Dana Point</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Fountain Valley</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Fullerton</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Garden Grove</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Huntington Beach</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Laguna Beach</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Laguna Hills</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Coto De Caza</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Stanton</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Los Alamitos</div>
                            </div>

                        </div>
                        <div className="button-container text-center mt-md-5 mt-sm-4 mt-3">
                            <button className="button1 text-white">
                                <div className="browse-all-locations fw-semibold text-white">BROWSE ALL LOCATIONS</div>
                            </button>
                        </div>
                    </div>
                </section>
                <section className="container pt-md-3 pt-2">
                    <div className="area-we-served px-0">
                        <div className="py-md-5 py-4">
                            <h2 className="area-we-served1 text-center">Areas We Serve In Riverside</h2>
                        </div>
                        <div className="location-grid-col">
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />
                                <div className="location-name">Temecula</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Perris</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Wildomar</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Fontana</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Woodcrest</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Inland Empire</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Moreno Valley</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Menifee</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Lake Elsinore</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Norco</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Rubidoux</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Mira Loma</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">San Jacinto</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Corona</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name"> Hemet</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Eastvale</div>
                            </div>

                        </div>
                        <div className="button-container text-center mt-md-5 mt-sm-4 mt-3">
                            <button className="button1 text-white">
                                <div className="browse-all-locations fw-semibold text-white">BROWSE ALL LOCATIONS</div>
                            </button>
                        </div>
                    </div>
                </section>
                <section className="container pt-md-3 pt-2 pb-md-5 pb-4">
                    <div className="area-we-served px-0">
                        <div className="py-md-5 py-4">
                            <h2 className="area-we-served1 text-center">Areas We Serve In Los Angeles</h2>
                        </div>
                        <div className="location-grid-col">
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />
                                <div className="location-name">Azusa</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">La Verne</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Chino</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">West Covina</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Rancho Cucamonga</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Whittier</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Torrance</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Duarte</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Diamond Bar</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Chino Hills</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Hacienda Heights</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Rialto</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">City of Industry</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">La Mirada</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Covina</div>
                            </div>
                            <div className="location-grid-item">
                                <Image
                                    className="column-items-icon"
                                    loading="lazy"
                                    alt=""
                                    src="/templates/frame-1686564363.svg"
                                    width={24}
                                    height={24}
                                />

                                <div className="location-name">Monrovia</div>
                            </div>

                        </div>
                        <div className="button-container text-center mt-md-5 mt-sm-4 mt-3">
                            <button className="button1 text-white">
                                <div className="browse-all-locations fw-semibold text-white">BROWSE ALL LOCATIONS</div>
                            </button>
                        </div>
                    </div>
                </section> */}
            </div>
        </>)
}


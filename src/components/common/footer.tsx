import Image from 'next/image'
import { Image25 } from '../../../public/page'

export const Footer = () => {
  return (
    <>
      <div className='bg-[#7854F7] max-w-[1920px] '>
        <div className='flex flex-col items-center text-white'>
          <div className='flex lg:gap-[118px] gap-12 justify-center flex-wrap pt-[51px] '>
            <div className='flex gap-3 items-center'>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='41'
                  height='41'
                  viewBox='0 0 41 41'
                  fill='none'
                >
                  <path
                    d='M20.5 0C9.17819 0 0 9.17819 0 20.5C0 31.8218 9.17819 41 20.5 41C31.8218 41 41 31.8218 41 20.5C41 9.17819 31.8218 0 20.5 0ZM20.5 4.45434C29.3618 4.45434 36.5432 11.6404 36.5432 20.5C36.5432 29.3596 29.3618 36.5432 20.5 36.5432C11.6382 36.5432 4.45684 29.3596 4.45684 20.5C4.45687 11.6404 11.6382 4.45434 20.5 4.45434ZM28.3552 10.7655L16.4736 22.6496L12.6198 18.7958L8.83861 22.5745L12.6924 26.4283L16.4986 30.2345L20.2773 26.4533L32.1614 14.5717L28.3552 10.7655Z'
                    fill='white'
                  />
                </svg>
              </div>
              <div className='flex text-xl leading-[52px] cursor-pointer'>
                <span className='font-normal mr-2'> 30 day </span>{' '}
                <span className='font-bold'>money back guarantee</span>
              </div>
            </div>
            <div className='flex gap-3 items-center'>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='41'
                  height='41'
                  viewBox='0 0 41 41'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M0 20.5C0 9.17819 9.17819 0 20.5 0C31.8218 0 41 9.17819 41 20.5C41 31.8218 31.8218 41 20.5 41C9.17819 41 0 31.8218 0 20.5ZM5.51913 14.7467C7.14548 10.5137 10.5139 7.14391 14.7469 5.51693L17.015 10.906C15.6155 11.416 14.344 12.2249 13.2889 13.2764C12.2339 14.3279 11.4207 15.5967 10.906 16.9945L5.51913 14.7467ZM14.7301 35.4744C10.5054 33.8456 7.14397 30.4806 5.51959 26.2542L10.906 24.026C11.4171 25.4201 12.2269 26.6856 13.2787 27.7338C14.3304 28.782 15.5986 29.5876 16.9945 30.094L14.7301 35.4744ZM35.4744 26.2699C33.8479 30.4883 30.4904 33.8466 26.2719 35.4737L24.0465 30.094C25.4361 29.5791 26.697 28.7678 27.7413 27.7163C28.7857 26.6649 29.5885 25.3986 30.094 24.0055L35.4744 26.2699ZM26.28 5.5273C30.4941 7.15581 33.8481 10.5127 35.4737 14.7281L30.094 16.9535C29.5805 15.572 28.7742 14.3181 27.7303 13.2777C26.6864 12.2374 25.4297 11.4353 24.0465 10.9265L26.28 5.5273ZM14.35 20.5C14.35 23.903 17.097 26.65 20.5 26.65C23.903 26.65 26.65 23.903 26.65 20.5C26.65 17.097 23.903 14.35 20.5 14.35C17.097 14.35 14.35 17.097 14.35 20.5Z'
                    fill='white'
                  />
                </svg>
              </div>
              <div className='flex text-xl leading-[52px] cursor-pointer'>
                <span className='font-bold mr-2'> Support </span>{' '}
                <span className='font-normal'>teams across the world</span>
              </div>
            </div>
            <div className='flex gap-3 items-center'>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='41'
                  height='41'
                  viewBox='0 0 41 41'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M0 20.5C0 9.17819 9.17819 0 20.5 0C31.8218 0 41 9.17819 41 20.5C41 31.8218 31.8218 41 20.5 41C9.17819 41 0 31.8218 0 20.5ZM36.5432 20.5C36.5432 11.6404 29.3618 4.45434 20.5 4.45434C11.6382 4.45434 4.45687 11.6404 4.45684 20.5C4.45684 29.3596 11.6382 36.5432 20.5 36.5432C29.3618 36.5432 36.5432 29.3596 36.5432 20.5ZM26.4314 14.6234V17.8214C27.7024 17.8214 28.9734 19.1006 28.9734 20.593V28.055C28.9734 29.3342 27.7024 30.6134 26.2196 30.6134H14.5687C13.2977 30.6134 12.0267 29.3342 12.0267 27.8418V20.3798C12.0267 19.1006 13.2977 17.8214 14.5687 17.8214V14.6234C14.5687 11.6386 17.5344 9.29335 20.5001 9.29335C23.4657 9.29335 26.4314 11.6386 26.4314 14.6234ZM17.3226 17.8214H23.6776V14.6234C23.6776 12.9178 22.1947 11.8518 20.5001 11.8518C18.8054 11.8518 17.3226 12.9178 17.3226 14.6234V17.8214Z'
                    fill='white'
                  />
                </svg>
              </div>
              <div className='flex text-xl leading-[52px] cursor-pointer'>
                <span className='font-bold mr-2'> Safe & Secure </span>{' '}
                <span className='font-normal'>online payment</span>
              </div>
            </div>
          </div>
          <div className='mt-[126px] flex justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='184'
              height='37'
              viewBox='0 0 184 37'
              fill='none'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M56.3642 0H5.76873C2.56681 0 -0.0252268 2.61744 0.00018527 5.79395V25.1071C0.00018527 28.3091 2.59222 30.9011 5.79414 30.9011H29.7577L40.7104 37L38.22 30.9011H56.3642C59.5661 30.9011 62.1582 28.3091 62.1582 25.1071V5.79395C62.1582 2.59203 59.5661 0 56.3642 0ZM4.70146 4.47239C3.98992 4.52322 3.45626 4.77734 3.10049 5.26017C2.74473 5.71759 2.61767 6.30207 2.6939 6.96278C4.19322 16.4923 5.59088 22.9216 6.8869 26.2506C7.39514 27.4703 7.97962 28.0548 8.66574 28.004C9.73305 27.9278 11.0037 26.4539 12.503 23.5823C13.2907 21.9559 14.5105 19.5164 16.1623 16.2636C17.5346 21.0665 19.4151 24.675 21.7784 27.0892C22.4391 27.7753 23.1252 28.0802 23.7859 28.0294C24.3704 27.9786 24.8278 27.6736 25.1328 27.1146C25.3869 26.6317 25.4885 26.0727 25.4377 25.4374C25.2853 23.1249 25.514 19.8975 26.1493 15.7554C26.81 11.4861 27.6232 8.41127 28.6142 6.5816C28.8175 6.20042 28.8938 5.81923 28.8684 5.36182C28.8175 4.77734 28.5634 4.29451 28.0806 3.91333C27.5978 3.53215 27.0641 3.35427 26.4796 3.40509C25.7427 3.45591 25.1836 3.81168 24.8024 4.52322C23.2269 7.39479 22.1087 12.0452 21.448 18.4999C20.4824 16.0603 19.6692 13.1887 19.0339 9.80893C18.7543 8.30962 18.0682 7.59808 16.9501 7.67432C16.1877 7.72514 15.5524 8.23338 15.0442 9.19904L9.47893 19.7959C8.5641 16.1111 7.70008 11.6132 6.91231 6.30207C6.73442 4.98064 5.99747 4.37074 4.70146 4.47239ZM53.6701 6.30211C55.4743 6.68329 56.8212 7.64895 57.736 9.24991C58.5492 10.6222 58.9558 12.2739 58.9558 14.2561C58.9558 16.8735 58.2951 19.2623 56.9737 21.4477C55.4489 23.9889 53.4668 25.2595 51.0018 25.2595C50.5698 25.2595 50.1124 25.2087 49.6296 25.1071C47.8253 24.7259 46.4785 23.7602 45.5636 22.1593C44.7504 20.7616 44.3438 19.0844 44.3438 17.1277C44.3438 14.5102 45.0046 12.1215 46.326 9.96145C47.8761 7.42024 49.8583 6.14963 52.2978 6.14963C52.7298 6.14963 53.1873 6.20046 53.6701 6.30211ZM52.6028 20.0501C53.543 19.2115 54.1783 17.9663 54.5341 16.2891C54.6357 15.7046 54.712 15.0693 54.712 14.4086C54.712 13.6716 54.5595 12.8838 54.2546 12.0961C53.8734 11.105 53.3651 10.5713 52.7553 10.4443C51.8404 10.2664 50.951 10.7746 50.1124 12.0198C49.4263 12.9855 48.9943 14.002 48.7656 15.0439C48.6385 15.6283 48.5877 16.2637 48.5877 16.899C48.5877 17.6359 48.7401 18.4237 49.0451 19.2114C49.4263 20.2025 49.9345 20.7362 50.5444 20.8632C51.1797 20.9903 51.8658 20.7108 52.6028 20.0501ZM41.8031 9.24991C40.8883 7.64895 39.516 6.68329 37.7372 6.30211C37.2544 6.20046 36.7969 6.14963 36.3649 6.14963C33.9254 6.14963 31.9432 7.42024 30.3931 9.96145C29.0717 12.1215 28.4109 14.5102 28.4109 17.1277C28.4109 19.0844 28.8175 20.7616 29.6307 22.1593C30.5456 23.7602 31.8924 24.7259 33.6967 25.1071C34.1795 25.2087 34.6369 25.2595 35.0689 25.2595C37.5339 25.2595 39.516 23.9889 41.0408 21.4477C42.3622 19.2623 43.0229 16.8735 43.0229 14.2561C43.0229 12.2739 42.6163 10.6222 41.8031 9.24991ZM38.6012 16.2891C38.2454 17.9663 37.6101 19.2115 36.6699 20.0501C35.9329 20.7108 35.2468 20.9903 34.6115 20.8632C34.0016 20.7362 33.4934 20.2025 33.1122 19.2114C32.8072 18.4237 32.6548 17.6359 32.6548 16.899C32.6548 16.2637 32.7056 15.6283 32.8326 15.0439C33.0614 14.002 33.4934 12.9855 34.1795 12.0198C35.0181 10.7746 35.9075 10.2664 36.8223 10.4443C37.4322 10.5713 37.9405 11.105 38.3217 12.0961C38.6266 12.8838 38.7791 13.6716 38.7791 14.4086C38.7791 15.0693 38.7283 15.7046 38.6012 16.2891Z'
                fill='white'
              />
              <path
                d='M68.5876 9.02117C66.885 10.6984 66.0464 12.833 66.0464 15.425C66.0464 18.1949 66.885 20.4566 68.5622 22.1592C70.2394 23.8618 72.4248 24.7258 75.1439 24.7258C75.9317 24.7258 76.8211 24.5988 77.7868 24.3193V20.2025C76.8974 20.4566 76.135 20.5837 75.4743 20.5837C74.1274 20.5837 73.0601 20.1263 72.2469 19.2368C71.4337 18.322 71.0272 17.1022 71.0272 15.5521C71.0272 14.1036 71.4338 12.9092 72.2215 11.9944C73.0347 11.0541 74.0258 10.5967 75.2456 10.5967C76.0333 10.5967 76.8719 10.7238 77.7868 10.9779V6.86115C76.9482 6.63244 76.0079 6.53078 75.0169 6.53078C72.4248 6.50537 70.2902 7.34398 68.5876 9.02117ZM86.2236 6.50537C83.8857 6.50537 82.056 7.29315 80.7346 8.84329C79.4132 10.3934 78.7778 12.5789 78.7778 15.3742C78.7778 18.3982 79.4386 20.7107 80.7346 22.3117C82.0306 23.9127 83.9365 24.7258 86.4269 24.7258C88.841 24.7258 90.6961 23.9127 91.9921 22.3117C93.2882 20.7107 93.9489 18.4491 93.9489 15.5521C93.9489 12.6551 93.2881 10.4188 91.9667 8.84329C90.6199 7.29315 88.714 6.50537 86.2236 6.50537ZM88.2311 19.7197C87.7737 20.4312 87.0876 20.787 86.2236 20.787C85.4104 20.787 84.8005 20.4312 84.3685 19.7197C83.9365 19.0081 83.7332 17.585 83.7332 15.425C83.7332 12.096 84.5718 10.4442 86.2744 10.4442C88.0533 10.4442 88.9681 12.1214 88.9681 15.5013C88.9427 17.5851 88.6886 19.0081 88.2311 19.7197ZM106.502 6.98821L105.588 10.8763C105.359 11.8673 105.13 12.8838 104.927 13.9257L104.419 16.6194C103.936 13.9257 103.275 10.7238 102.436 6.98821H96.5409L94.33 24.2938H98.7517L99.9461 12.3756L102.97 24.2938H106.121L109.018 12.401L110.263 24.2938H114.888L112.551 6.98821H106.502ZM127.671 6.98821L126.756 10.8763C126.527 11.8673 126.298 12.8838 126.095 13.9257L125.587 16.6194C125.104 13.9257 124.443 10.7238 123.605 6.98821H117.709L115.498 24.2938H119.92L121.114 12.3756L124.138 24.2938H127.29L130.161 12.401L131.406 24.2938H136.031L133.693 6.98821H127.671ZM142.054 17.458H146.196V13.8749H142.054V10.6984H146.831V7.01361H137.378V24.3193H146.857V20.6345H142.054V17.458ZM160.02 14.7135C160.503 13.9257 160.757 13.1125 160.757 12.2739C160.757 10.6475 160.122 9.35153 158.851 8.41128C157.581 7.47103 155.827 6.98821 153.642 6.98821H148.204V24.2938H152.88V16.4161H152.956L156.742 24.2938H161.672L157.937 16.4923C158.826 16.0857 159.537 15.5013 160.02 14.7135ZM152.854 14.4339V10.3172C153.972 10.3426 154.76 10.5205 155.243 10.8763C155.726 11.232 155.954 11.7911 155.954 12.6043C155.954 13.7986 154.912 14.4085 152.854 14.4339ZM163.502 9.02117C161.799 10.6984 160.961 12.833 160.961 15.425C160.961 18.1949 161.799 20.4566 163.476 22.1592C165.154 23.8618 167.339 24.7258 170.058 24.7258C170.846 24.7258 171.735 24.5988 172.701 24.3193V20.2025C171.812 20.4566 171.049 20.5837 170.388 20.5837C169.042 20.5837 167.974 20.1263 167.161 19.2368C166.348 18.322 165.941 17.1022 165.941 15.5521C165.941 14.1036 166.348 12.9092 167.136 11.9944C167.949 11.0541 168.94 10.5967 170.16 10.5967C170.947 10.5967 171.786 10.7238 172.701 10.9779V6.86115C171.862 6.63244 170.922 6.53078 169.931 6.53078C167.364 6.50537 165.204 7.34398 163.502 9.02117ZM178.673 20.5837V17.4326H182.815V13.8495H178.673V10.673H183.476V6.98821H174.022V24.2938H183.501V20.6091H178.673V20.5837Z'
                fill='white'
              />
            </svg>
          </div>
          <div className='3xl:w-[1480px] xl:w-[1160px] lg:w-[840px] sm:w-[640px] w-[340px] h-[1px] bg-[#9A7DFF] mt-14'></div>
          <div className='flex justify-center gap-[138px] flex-wrap mt-9 mb-10'>
            <div>
              <div className='text-sm font-bold  uppercase cursor-pointer '>
                Who we Are
              </div>
              <div className='text-xs font-normal mt-5 cursor-pointer'>
                About
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Team
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Work With Us
              </div>
            </div>
            <div>
              <div className='text-sm font-bold  uppercase cursor-pointer'>
                Woocommerce
              </div>
              <div className='text-xs font-normal mt-5 cursor-pointer'>
                Features
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Payments
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Marketing
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Shipping
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Extension Store
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                eCommerce blog
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Development blog
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Ideas board
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Mobile App
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Community
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Style Guide
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Email Newsletter
              </div>
            </div>
            <div>
              <div className='text-sm font-bold  uppercase cursor-pointer'>
                Other products
              </div>
              <div className='text-xs font-normal mt-5 cursor-pointer'>
                Storefront
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                WooSlider
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Sensei
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Sensei Extensions
              </div>
            </div>
            <div>
              <div className='text-sm font-bold  uppercase cursor-pointer'>
                Support
              </div>
              <div className='text-xs font-normal mt-5 cursor-pointer'>
                Documentation
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Customizations
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Support Policy
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Contact
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                COVID-19 Resources
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Privacy Notice for
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                California Users
              </div>
            </div>
            <div>
              <div className='text-sm font-bold  uppercase cursor-pointer'>
                We recommend
              </div>
              <div className='text-xs font-normal mt-5 cursor-pointer'>
                WooExperts
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Hosting Solutions
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Pre-sales FAQ
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Success Stories
              </div>
              <div className='text-xs font-normal mt-2 cursor-pointer'>
                Design Feedback Group
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-[#FFF]'>
        <div className='3xl:max-w-[1920px] container mx-auto'>
          <div className='flex flex-wrap justify-between items-center gap-5 py-[25px] 3xl:px-[220px]'>
            <div className='flex gap-[54px] items-center'>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='25'
                  height='20'
                  viewBox='0 0 25 20'
                  fill='none'
                >
                  <path
                    d='M24.6183 2.37575C23.713 2.76628 22.7278 3.04735 21.713 3.15682C22.7666 2.53089 23.5556 1.54202 23.9319 0.375752C22.9433 0.963885 21.8602 1.37629 20.7308 1.59469C20.2587 1.09003 19.6878 0.687999 19.0535 0.413643C18.4193 0.139287 17.7354 -0.00151415 17.0444 1.22793e-05C14.2485 1.22793e-05 12 2.26628 12 5.04735C12 5.43788 12.0473 5.82841 12.1243 6.20415C7.93786 5.98522 4.20414 3.98522 1.72189 0.923089C1.2696 1.69562 1.03258 2.57524 1.0355 3.47042C1.0355 5.2219 1.92603 6.76628 3.28402 7.67456C2.48374 7.64305 1.7022 7.42308 1.00296 7.03255V7.09468C1.00296 9.54734 2.73668 11.5799 5.04733 12.0473C4.61348 12.16 4.16718 12.2177 3.71893 12.2189C3.39053 12.2189 3.07988 12.1864 2.76627 12.142C3.40532 14.142 5.26627 15.5947 7.48224 15.642C5.74852 17 3.57692 17.7988 1.21893 17.7988C0.795858 17.7988 0.405325 17.784 0 17.7367C2.23668 19.1716 4.89053 20 7.74852 20C17.0266 20 22.1035 12.3136 22.1035 5.64202C22.1035 5.42309 22.1035 5.20415 22.0887 4.98522C23.071 4.26628 23.9319 3.37575 24.6183 2.37575Z'
                    fill='#272D4E'
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='21'
                  height='20'
                  viewBox='0 0 21 20'
                  fill='none'
                >
                  <path
                    d='M10.6172 0C5.09516 0 0.618164 4.477 0.618164 9.999C0.618164 14.989 4.27416 19.125 9.05516 19.878V12.89H6.51516V9.999H9.05516V7.796C9.05516 5.288 10.5482 3.905 12.8312 3.905C13.9252 3.905 15.0712 4.1 15.0712 4.1V6.559H13.8072C12.5672 6.559 12.1792 7.331 12.1792 8.122V9.997H14.9502L14.5072 12.888H12.1792V19.876C16.9602 19.127 20.6162 14.99 20.6162 9.999C20.6162 4.477 16.1392 0 10.6172 0Z'
                    fill='#272D4E'
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='21'
                  height='20'
                  viewBox='0 0 21 20'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M2.63925 0C12.5911 0 20.6905 8.07576 20.7327 18.0176V18.0182H20.7342V19.0701H20.7224C20.6961 19.3033 20.5917 19.5209 20.4262 19.6874C20.2607 19.8539 20.0439 19.9596 19.8108 19.9875V19.9999H17.9405V19.9978C17.6875 19.9925 17.445 19.8955 17.2582 19.7247C17.0714 19.554 16.953 19.3213 16.925 19.0698H16.9132V18.0179H16.9238C16.8816 10.1756 10.4909 3.80861 2.63895 3.80861C2.63149 3.80861 2.62404 3.80807 2.61659 3.80752C2.61037 3.80707 2.60416 3.80662 2.59795 3.80648V3.82106H1.54604V3.80922C1.31275 3.78293 1.09519 3.67858 0.928667 3.5131C0.76214 3.34762 0.65642 3.13072 0.628661 2.8976H0.616211V1.02731H0.618337C0.62363 0.774312 0.720661 0.531853 0.891372 0.345054C1.06208 0.158255 1.29485 0.0398392 1.54635 0.0118429V0H2.59825V0.00212567C2.60443 0.00198836 2.61055 0.00154061 2.61669 0.00109124C2.62413 0.000546809 2.6316 0 2.63925 0ZM2.63925 7.20619C2.6316 7.20619 2.62413 7.20674 2.61669 7.20728L2.61668 7.20728C2.61054 7.20773 2.60443 7.20818 2.59825 7.20832V7.20619H1.54635V7.21804C1.29485 7.24603 1.06208 7.36445 0.891372 7.55125C0.720661 7.73805 0.62363 7.9805 0.618337 8.2335H0.616211V10.1038H0.628661C0.656472 10.3369 0.762209 10.5538 0.928726 10.7192C1.09524 10.8847 1.31277 10.9891 1.54604 11.0154V11.0273H2.59795V11.0127C2.60416 11.0128 2.61037 11.0133 2.61658 11.0137C2.62404 11.0143 2.63149 11.0148 2.63895 11.0148C6.5174 11.0148 9.67585 14.149 9.71776 18.0177H9.70774V19.0696H9.71958C9.74758 19.3211 9.86599 19.5539 10.0528 19.7246C10.2396 19.8953 10.482 19.9923 10.735 19.9976V19.9997H12.605V19.9873C12.8381 19.9595 13.055 19.8537 13.2205 19.6872C13.3859 19.5207 13.4903 19.3032 13.5166 19.0699H13.5285V18.018H13.5267C13.4851 12.0488 8.61757 7.20619 2.63925 7.20619ZM3.46569 14.5393C3.11545 14.5393 2.76865 14.6083 2.44509 14.7424C2.12154 14.8764 1.82756 15.0729 1.57996 15.3207C1.33237 15.5684 1.136 15.8624 1.00208 16.186C0.868166 16.5097 0.79932 16.8565 0.79948 17.2067C0.79948 17.5569 0.868459 17.9037 1.00248 18.2273C1.1365 18.5508 1.33294 18.8448 1.58057 19.0925C1.82821 19.3401 2.1222 19.5365 2.44575 19.6705C2.7693 19.8046 3.11608 19.8735 3.4663 19.8735C3.81651 19.8735 4.16329 19.8046 4.48684 19.6705C4.81039 19.5365 5.10438 19.3401 5.35202 19.0925C5.59965 18.8448 5.79609 18.5508 5.93011 18.2273C6.06413 17.9037 6.13311 17.5569 6.13311 17.2067C6.13327 16.8564 6.06438 16.5095 5.93039 16.1858C5.7964 15.8621 5.59992 15.5679 5.3522 15.3202C5.10447 15.0725 4.81035 14.876 4.48666 14.742C4.16296 14.608 3.81602 14.5391 3.46569 14.5393Z'
                    fill='#272D4E'
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='21'
                  height='20'
                  viewBox='0 0 21 20'
                  fill='none'
                >
                  <path
                    d='M10.7319 6.66525C8.89563 6.66525 7.39712 8.16376 7.39712 10C7.39712 11.8362 8.89563 13.3348 10.7319 13.3348C12.5681 13.3348 14.0666 11.8362 14.0666 10C14.0666 8.16376 12.5681 6.66525 10.7319 6.66525ZM20.7336 10C20.7336 8.61907 20.7461 7.25064 20.6686 5.87221C20.591 4.27113 20.2258 2.85017 19.055 1.67938C17.8817 0.506085 16.4632 0.14334 14.8622 0.065788C13.4812 -0.0117644 12.1128 0.000744113 10.7344 0.000744113C9.35344 0.000744113 7.98502 -0.0117644 6.60659 0.065788C5.0055 0.14334 3.58454 0.508587 2.41375 1.67938C1.24046 2.85267 0.877715 4.27113 0.800163 5.87221C0.722611 7.25314 0.735119 8.62157 0.735119 10C0.735119 11.3784 0.722611 12.7494 0.800163 14.1278C0.877715 15.7289 1.24296 17.1498 2.41375 18.3206C3.58705 19.4939 5.0055 19.8567 6.60659 19.9342C7.98752 20.0118 9.35594 19.9993 10.7344 19.9993C12.1153 19.9993 13.4837 20.0118 14.8622 19.9342C16.4632 19.8567 17.8842 19.4914 19.055 18.3206C20.2283 17.1473 20.591 15.7289 20.6686 14.1278C20.7486 12.7494 20.7336 11.3809 20.7336 10ZM10.7319 15.131C7.89245 15.131 5.60091 12.8394 5.60091 10C5.60091 7.16058 7.89245 4.86903 10.7319 4.86903C13.5713 4.86903 15.8628 7.16058 15.8628 10C15.8628 12.8394 13.5713 15.131 10.7319 15.131ZM16.073 5.8572C15.41 5.8572 14.8747 5.32184 14.8747 4.65889C14.8747 3.99594 15.41 3.46058 16.073 3.46058C16.7359 3.46058 17.2713 3.99594 17.2713 4.65889C17.2715 4.81631 17.2406 4.97222 17.1805 5.1177C17.1203 5.26317 17.0321 5.39535 16.9208 5.50666C16.8094 5.61798 16.6773 5.70624 16.5318 5.76639C16.3863 5.82654 16.2304 5.8574 16.073 5.8572Z'
                    fill='#272D4E'
                  />
                </svg>
              </div>
            </div>
            <div className='text-[#272D4E] text-xs leading-[22px] font-normal flex'>
              COPYRIGHT WOOCOMMERCE 2020 -{' '}
              <p className='underline'>TERMS & CONDITIONS PRIVACY POLICY</p>
            </div>
            <div>
              <Image src={Image25} alt='images' width={183} height={14} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

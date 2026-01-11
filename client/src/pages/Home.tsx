import React, { useState, useEffect, useRef } from 'react';
import { Shield, Calculator, FileText, CheckCircle, PenTool, Printer, ChevronDown, ChevronUp, DollarSign, Briefcase, Zap, Lock } from 'lucide-react';

const DigitalProposal = () => {
  const [activeTab, setActiveTab] = useState('proposal');
  const [revenueInput, setRevenueInput] = useState(2000);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    partnerName: 'Georgetown Auto Spa',
    primaryContact: '',
    referralMethod: '',
    payoutCadence: 'Monthly (Net-5)',
    workLocation: '',
    launchDate: '',
    georgetownSig: '',
    georgetownDate: new Date().toISOString().split('T')[0],
    crystalClearSig: 'Angel Vasquez',
    crystalClearDate: '2026-01-10',
    bergerSig: 'Harrison Berger',
    bergerDate: '2026-01-10'
  });

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) setIsScrolled(true);
    else setIsScrolled(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Commission Calculation
  const processingFee = revenueInput * 0.029;
  const netRevenue = revenueInput - processingFee;
  const partnerCommission = netRevenue * 0.25;
  const serviceProviderRevenue = netRevenue * 0.75;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-amber-100 selection:text-amber-900 print:bg-white">
      
      {/* Navigation Bar - Hidden on Print */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 print:hidden ${isScrolled ? 'bg-slate-900 text-white shadow-lg py-2' : 'bg-transparent text-slate-900 py-4'}`}>
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <Shield className={`w-6 h-6 ${isScrolled ? 'text-amber-400' : 'text-slate-900'}`} />
            <span>PARTNERSHIP<span className={isScrolled ? 'text-amber-400' : 'text-slate-600'}>PROTOCOL</span></span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => document.getElementById('calculator')?.scrollIntoView({behavior: 'smooth'})} className="flex items-center gap-1 hover:text-amber-500 transition-colors text-sm font-medium">
              <Calculator className="w-4 h-4" /> Profit Simulator
            </button>
            <button onClick={handlePrint} className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md transition-all transform hover:scale-105">
              <Printer className="w-4 h-4" /> Export / Print
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-6 bg-slate-900 text-white print:bg-white print:text-black print:pt-10 print:pb-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-6 print:hidden">
            Official Agreement • 2026
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 print:text-3xl">
            Paint Correction <span className="text-amber-500 print:text-black">&</span> Ceramic Coating Fulfillment
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-light print:text-slate-600 print:text-lg">
            Simple. Trackable. Zero build-out required.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-left border-t border-slate-700 pt-8 mt-8 print:border-slate-300 print:grid-cols-2">
            <div>
              <span className="block text-slate-400 text-xs uppercase tracking-wider mb-1">Prepared For</span>
              <span className="font-bold text-lg">{formData.partnerName}</span>
            </div>
            <div>
              <span className="block text-slate-400 text-xs uppercase tracking-wider mb-1">Prepared By</span>
              <span className="font-bold">Crystal Clear Detail, LLC</span>
              <br/>
              <span className="font-bold">Berger Mobile Detailing LLC</span>
            </div>
            <div className="md:text-right">
               <span className="block text-slate-400 text-xs uppercase tracking-wider mb-1">Date</span>
               <span className="font-mono">January 10, 2026</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-16 print:py-4 print:space-y-8">
        
        {/* Executive Summary */}
        <section className="prose prose-slate max-w-none">
          <h2 className="flex items-center gap-3 text-2xl font-bold border-b-2 border-slate-100 pb-2 mb-6 print:text-xl">
            <Briefcase className="text-amber-500 print:hidden" /> Executive Summary
          </h2>
          <p className="text-lg leading-relaxed text-slate-600 mb-8">
            You have customers who want ceramic coatings and real paint correction, but you do not have the in-house technicians, process, or setup to deliver it consistently. This partnership fills that gap instantly.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 print:block">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 print:border-0 print:p-0 print:mb-4">
              <h3 className="text-slate-900 font-bold mb-4 flex items-center gap-2">
                <span className="bg-slate-100 p-1 rounded text-slate-500 print:hidden">YOU</span> Provide
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 print:hidden" />
                  <span>Introductions / referrals for coating & correction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 print:hidden" />
                  <span>A consistent, suitable work space (for on-site jobs).</span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-900 text-white p-6 rounded-xl shadow-xl border border-slate-700 print:bg-white print:text-black print:border-0 print:p-0 print:shadow-none">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2 print:text-black">
                <span className="bg-slate-700 p-1 rounded text-amber-400 print:hidden">WE</span> Provide
              </h3>
              <ul className="space-y-3 text-slate-300 print:text-black">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 print:hidden" />
                  <span>All labor, tools, pads, polish, coating products, and lighting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 print:hidden" />
                  <span>Brand alignment on how the handoff is presented.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 print:hidden" />
                  <span>Execution + Quality Control + Handoff + Aftercare.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Scope of Services */}
        <section className="print:break-inside-avoid">
          <h2 className="flex items-center gap-3 text-2xl font-bold border-b-2 border-slate-100 pb-2 mb-6 print:text-xl">
            <Zap className="text-amber-500 print:hidden" /> Scope of Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Paint Correction", desc: "One-step or multi-step, based on vehicle condition and customer goals." },
              { title: "Ceramic Coating", desc: "Coating tier selected after inspection." },
              { title: "Exterior Prep", desc: "Wash, decontamination, clay bar, and IPA wipe required for coating." },
              { title: "Final Inspection", desc: "Quality control and customer aftercare instructions." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm print:border-slate-300">
                <strong className="block text-slate-900 mb-1">{item.title}</strong>
                <span className="text-slate-600 text-sm">{item.desc}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500 italic">
            *Note: Any services outside paint correction and ceramic coating (e.g., window tint, PPF) are handled only if separately requested and scheduled.*
          </p>
        </section>

        {/* Operational Standards */}
        <section className="bg-slate-50 border border-slate-200 rounded-xl p-8 print:bg-white print:border-0 print:p-0 print:break-inside-avoid">
           <h2 className="text-2xl font-bold mb-6 text-slate-900 print:text-xl">Operational Standards & Location Requirements</h2>
           <p className="mb-6 text-slate-600">To ensure the finish quality promised to the customer, the hosting facility must meet the following environmental standards during the booked service window.</p>
           
           <div className="space-y-6">
             <div>
               <h4 className="font-bold text-slate-800 uppercase text-sm tracking-wider mb-2 border-l-4 border-amber-500 pl-3">1. The Workspace</h4>
               <ul className="list-disc pl-5 space-y-2 text-slate-700 ml-4">
                 <li><strong>Dedicated Bay:</strong> A designated, dust-free work area cleared prior to our arrival. No active washing nearby.</li>
                 <li><strong>Climate Control:</strong> Must be between <strong>50°F and 80°F</strong>. Extreme heat/humidity compromises bonding.</li>
                 <li><strong>Space Dimensions:</strong> Minimum 3 feet clearance around the entire vehicle.</li>
               </ul>
             </div>
             
             <div>
               <h4 className="font-bold text-slate-800 uppercase text-sm tracking-wider mb-2 border-l-4 border-amber-500 pl-3">2. Utilities & Lighting</h4>
               <ul className="list-disc pl-5 space-y-2 text-slate-700 ml-4">
                 <li><strong>Lighting:</strong> If overhead lighting is poor, space must accommodate mobile inspection lights.</li>
                 <li><strong>Power & Water:</strong> Access to standard 15/20-amp outlet and water spigot within 50 feet.</li>
               </ul>
             </div>

             <div>
               <h4 className="font-bold text-slate-800 uppercase text-sm tracking-wider mb-2 border-l-4 border-amber-500 pl-3">3. Site Logistics</h4>
               <ul className="list-disc pl-5 space-y-2 text-slate-700 ml-4">
                 <li><strong>Cure Time:</strong> Minimum <strong>12-hour cure time</strong> (dry) indoors before rain/sprinkler exposure.</li>
                 <li><strong>Traffic:</strong> No thru-traffic or movement during polishing/coating phases.</li>
               </ul>
             </div>
           </div>
        </section>

        {/* Liability & Protections */}
        <section className="print:break-before-page">
          <h2 className="flex items-center gap-3 text-2xl font-bold border-b-2 border-slate-100 pb-2 mb-6 print:text-xl">
            <Lock className="text-amber-500 print:hidden" /> Terms of Engagement: Protections & Liability
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-lg mb-3">I. Protection & Boundaries</h3>
              <div className="grid gap-3 text-sm text-slate-700">
                <p><span className="font-bold text-slate-900">Non-solicitation:</span> Neither party shall recruit or hire the other party’s employees/subcontractors for 12 months post-termination.</p>
                <p><span className="font-bold text-slate-900">Non-circumvention:</span> Referred customers are not to be redirected ("side deals") to avoid commission.</p>
                <p><span className="font-bold text-slate-900">Pricing Integrity:</span> Partner will not undercut, re-sell, or independently offer services to the same referred customer during quoting.</p>
              </div>
            </div>

            <div className="bg-amber-50/50 p-6 rounded-lg border border-amber-100 print:bg-white print:border-slate-200 print:p-0">
              <h3 className="font-bold text-lg mb-3 text-amber-900 print:text-black">II. Liability & Mutual Indemnification</h3>
              <div className="space-y-4 text-sm text-slate-800">
                <div>
                  <strong className="block text-amber-800 mb-1 print:text-black">1. Service Liability (Our Responsibility)</strong>
                  <p>Crystal Clear Detail, LLC and Berger Mobile Detailing LLC agree to indemnify, defend, and hold Georgetown Auto Spa harmless against claims arising <strong>directly</strong> from our detailing services (e.g., accidental damage to paint/interior by our tools).</p>
                </div>
                <div>
                  <strong className="block text-amber-800 mb-1 print:text-black">2. Premise & Custodial Liability (Your Responsibility)</strong>
                  <p>Georgetown Auto Spa agrees to indemnify and hold Crystal Clear Detail/Berger harmless against damages arising from facility negligence (e.g., roof leaks, garage door malfunction, theft while stored overnight).</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">III. Pre-Existing Damage & Inspection</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                 <li><strong>Mandatory Report:</strong> A Pre-Inspection Report must be signed by a Georgetown rep prior to work.</li>
                 <li><strong>Liability Exclusion:</strong> We are <strong>not liable</strong> for pre-existing damage (rock chips, clear coat failure) documented in the report.</li>
                 <li><strong>Custody Rule:</strong> If Georgetown takes custody of keys before arrival, they attest to the vehicle’s condition as received until Pre-Inspection.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Financial Logistics & Calculator */}
        <section id="calculator" className="scroll-mt-24 print:break-inside-avoid">
           <h2 className="flex items-center gap-3 text-2xl font-bold border-b-2 border-slate-100 pb-2 mb-6 print:text-xl">
            <DollarSign className="text-amber-500 print:hidden" /> Financial Logistics & Compensation
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8 print:block">
            <div className="text-sm text-slate-700 space-y-4">
               <p><strong className="text-slate-900">Commission Rate:</strong> Georgetown Auto Spa retains <strong>25% of Net Labor & Product Revenue</strong>.</p>
               <p><strong className="text-slate-900">Net Revenue Definition:</strong> Calculated after deduction of sales tax and credit card processing fees (~2.9%). Excludes unrelated add-ons.</p>
               <p><strong className="text-slate-900">Payout Schedule:</strong> Monthly. Paid by the 5th of the following month (Net-5).</p>
               <p><strong className="text-slate-900">Lead Definition:</strong> Direct intro, Tracking Link/QR, or agreed referral channel.</p>
            </div>

            {/* Interactive Calculator - Hidden on Print if desired, or stylized static */}
            <div className="bg-slate-900 text-white p-6 rounded-xl shadow-2xl print:bg-white print:text-black print:shadow-none print:border print:border-slate-300">
              <h3 className="text-amber-400 font-bold mb-4 uppercase tracking-widest text-xs print:text-black">Revenue Simulator</h3>
              <div className="mb-6 print:hidden">
                <label className="block text-xs text-slate-400 mb-1">Enter Job Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400">$</span>
                  <input 
                    type="number" 
                    value={revenueInput} 
                    onChange={(e) => setRevenueInput(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 pl-7 text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between text-slate-400 print:text-slate-600">
                  <span>Gross Job Price</span>
                  <span>${revenueInput.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-xs">
                  <span>- CC Fees (2.9%)</span>
                  <span>-${processingFee.toFixed(2)}</span>
                </div>
                <div className="h-px bg-slate-700 my-2 print:bg-slate-300"></div>
                <div className="flex justify-between text-amber-400 font-bold text-lg print:text-black">
                  <span>Your Cut (25%)</span>
                  <span>${partnerCommission.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-xs mt-1">
                  <span>Service Provider (75%)</span>
                  <span>${serviceProviderRevenue.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section className="print:break-inside-avoid">
           <h2 className="text-xl font-bold mb-4 text-slate-900">Workflow: From Lead to Delivery</h2>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             {[
               { step: "1", title: "Referral", text: "Team makes a quick intro (text/email/form)." },
               { step: "2", title: "Inspection", text: "We quote, confirm paint condition & timeline." },
               { step: "3", title: "Execution", text: "Pre-inspection signed. Work performed." },
               { step: "4", title: "Closeout", text: "QC, Handoff, Payment, & Review Request." }
             ].map((item, i) => (
               <div key={i} className="relative p-4 bg-slate-50 rounded border border-slate-100 print:border-slate-300">
                 <div className="absolute -top-3 -left-2 w-8 h-8 bg-amber-500 text-white flex items-center justify-center rounded-full font-bold shadow-sm print:bg-black print:text-white">{item.step}</div>
                 <h4 className="font-bold mt-2 mb-1">{item.title}</h4>
                 <p className="text-xs text-slate-600">{item.text}</p>
               </div>
             ))}
           </div>
        </section>

        {/* Next Steps & Inputs */}
        <section className="bg-white border-t-4 border-amber-500 p-8 shadow-lg rounded-sm mt-12 print:shadow-none print:border-t-2 print:border-black print:p-0 print:mt-8 print:break-inside-avoid">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <PenTool className="w-6 h-6 text-amber-600 print:hidden" /> 
            Agreement Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Partner Name / Company</label>
              <input 
                type="text" 
                name="partnerName"
                value={formData.partnerName} 
                onChange={handleInputChange}
                className="w-full border-b-2 border-slate-200 bg-transparent py-2 focus:outline-none focus:border-amber-500 transition-colors print:border-b print:border-black"
                placeholder="Enter Company Name"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Primary Contact</label>
              <input 
                type="text" 
                name="primaryContact"
                value={formData.primaryContact} 
                onChange={handleInputChange}
                className="w-full border-b-2 border-slate-200 bg-transparent py-2 focus:outline-none focus:border-amber-500 transition-colors print:border-b print:border-black"
                placeholder="Name, Phone, Email"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Preferred Referral Method</label>
              <input 
                type="text" 
                name="referralMethod"
                value={formData.referralMethod} 
                onChange={handleInputChange}
                className="w-full border-b-2 border-slate-200 bg-transparent py-2 focus:outline-none focus:border-amber-500 transition-colors print:border-b print:border-black"
                placeholder="Text / Email / Form / Link"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Payout Cadence</label>
              <input 
                type="text" 
                name="payoutCadence"
                value={formData.payoutCadence} 
                onChange={handleInputChange}
                className="w-full border-b-2 border-slate-200 bg-transparent py-2 focus:outline-none focus:border-amber-500 transition-colors print:border-b print:border-black"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Where Work Will Be Performed</label>
              <input 
                type="text" 
                name="workLocation"
                value={formData.workLocation} 
                onChange={handleInputChange}
                className="w-full border-b-2 border-slate-200 bg-transparent py-2 focus:outline-none focus:border-amber-500 transition-colors print:border-b print:border-black"
                placeholder="Address or Location Preference"
              />
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            
            {/* Georgetown Sig */}
            <div>
              <div className="border-b-2 border-black pb-1 mb-2">
                <input 
                  type="text" 
                  name="georgetownSig"
                  value={formData.georgetownSig}
                  onChange={handleInputChange}
                  className="w-full font-script text-2xl text-slate-900 focus:outline-none bg-transparent placeholder:text-slate-200"
                  placeholder="Sign Here"
                  style={{ fontFamily: '"Brush Script MT", cursive' }}
                />
              </div>
              <label className="block text-xs font-bold uppercase tracking-wider">{formData.partnerName}</label>
              <div className="mt-2 text-xs">
                Date: <input type="date" name="georgetownDate" value={formData.georgetownDate} onChange={handleInputChange} className="bg-transparent" />
              </div>
            </div>

            {/* Crystal Clear Sig */}
            <div>
              <div className="border-b-2 border-black pb-1 mb-2">
                 <div className="text-2xl text-slate-900 font-script" style={{ fontFamily: '"Brush Script MT", cursive' }}>
                   {formData.crystalClearSig}
                 </div>
              </div>
              <label className="block text-xs font-bold uppercase tracking-wider">Crystal Clear Detail, LLC</label>
              <div className="mt-2 text-xs">Date: {formData.crystalClearDate}</div>
            </div>

             {/* Berger Sig */}
             <div className="md:col-start-2">
              <div className="border-b-2 border-black pb-1 mb-2">
                 <div className="text-2xl text-slate-900 font-script" style={{ fontFamily: '"Brush Script MT", cursive' }}>
                   {formData.bergerSig}
                 </div>
              </div>
              <label className="block text-xs font-bold uppercase tracking-wider">Berger Mobile Detailing LLC</label>
              <div className="mt-2 text-xs">Date: {formData.bergerDate}</div>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-slate-400 text-xs mt-20 pb-10 print:hidden">
          <p>Generated by Crystal Clear Detail & Berger Mobile Detailing Partnership Engine.</p>
          <p className="mt-2">Confidential & Proprietary.</p>
        </footer>

      </main>

      {/* COI Placeholder for Print */}
      <div className="hidden print:block print:break-before-page p-8">
        <h2 className="text-2xl font-bold mb-8">Certificates of Insurance</h2>
        <div className="grid grid-cols-2 gap-8 h-96">
            <div className="border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                Attach Crystal Clear COI Here
            </div>
            <div className="border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                Attach Berger Mobile Detailing COI Here
            </div>
        </div>
      </div>

    </div>
  );
};

export default DigitalProposal;
export { DigitalProposal };
"use client";
import { toast } from "react-toastify";
import TechnologySelector from "./TechnologySelector";
import JobPreferencesPlace from "../JobOfferPreferencesPlace";
import JobOfferCitiesPicker from "./JobOfferCitiesPicker";
import EditorNiceToHave from "./EditorNiceToHave";
import EditorResponsibilities from "./EditorResponsibilities";
import JobOfferLevel from "../JobOfferLevel";

export default function StepTwo({
  formData,
  handleChange,
  currentStep,
  prevStep,
  nextStep,
  setFormData,
  light,
}: {
  setFormData: any;
  formData: any;
  handleChange: any;
  currentStep: number;
  prevStep: any;
  nextStep: any;
  light: boolean;
}) {
  function addJobPlace(preference: any) {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      places: [...(prevFormData?.places || []), preference],
    }));
  }

  function removeJobPlace(preference: any) {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      places: prevFormData?.places?.filter((p: any) => p !== preference) || [],
    }));
  }
  function addJobLevel(preference: any) {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      levels: [...(prevFormData?.levels || []), preference],
    }));
  }

  function removeJobLevel(preference: any) {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      levels: prevFormData?.levels?.filter((p: any) => p !== preference) || [],
    }));
  }
  return (
    <div className="w-full">
      {currentStep === 2 && (
        <div className="w-full">
          <div className="flex flex-col">
            <div className="flex flex-row items-center flex-wrap">
              <div className={"flex items-center flex-wrap w-full"}>
                <div className="w-full">
                  <div>
                    <h3 className="font-extrabold mt-2">Nazwa firmy</h3>
                    <input
                      className={`${
                        light ? "bg-white text-black" : "bg-gray-700 text-white"
                      } duration-300 border border-primaryStart/70 rounded-md p-2 w-full sm:w-[300px]`}
                      value={formData?.name}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        });
                      }}
                      placeholder="Wpisz nazwę"
                    />
                  </div>
                  <JobPreferencesPlace
                    addPreference={addJobPlace}
                    removePreference={removeJobPlace}
                    formData={formData}
                    light={light}
                  />
                  {(formData?.places?.includes("Hybrydowy") ||
                    formData?.places?.includes("Stacjonarny")) && (
                    <div className="mt-3">
                      <JobOfferCitiesPicker
                        setFormData={setFormData}
                        light={light}
                        formData={formData}
                      />
                    </div>
                  )}
                  <JobOfferLevel
                    setFormData={setFormData}
                    formData={formData}
                    light={light}
                  />
                  <div className="mt-3">
                    <h3 className="font-extrabold ">Rodzaj Wynagrodzenia</h3>
                    <select
                      value={formData?.salary || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salary: e.target.value,
                        })
                      }
                      className={`${
                        light ? "bg-white text-black" : "bg-gray-700 text-white"
                      } duration-300 border border-primaryStart/70 rounded-md p-2 w-full sm:w-[300px]`}
                    >
                      <option value="Nie podano">Rodzaj wynagrodzenia</option>
                      <option value="Stawka godzinowa">Stawka godzinowa</option>
                      <option value="Stawka miesięczna">
                        Stawka miesięczna
                      </option>
                      <option value="Per Milestone">Per Milestone</option>
                      <option value="Prowizja">Prowizja</option>
                      <option value="Akcje i udziały">Akcje i udziały</option>
                      <option value="Inne">Inne</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {formData?.preferences?.filter((preference: string) =>
            [
              "Staż",
              "Praktyki",
              "Pełny etat",
              "Część etatu",
              "Umowa o pracę",
            ].includes(preference)
          ).length > 0 && (
            <div className="mt-3">
              <div className="flex flex-col">
                <h3 className="font-extrabold drop-shadow-lg">Kwota brutto</h3>
                {formData?.salaryValueBruttoTo <
                  formData?.salaryValueBruttoFrom && (
                  <div className="text-red-500 text-sm">Uzupełnij dane</div>
                )}
                <div className="flex flex-row flex-wrap text-gray-600 text-sm">
                  {formData?.preferences
                    ?.filter((preference: string) =>
                      [
                        "Staż",
                        "Praktyki",
                        "Pełny etat",
                        "Część etatu",
                        "Umowa o pracę",
                      ].includes(preference)
                    )
                    .join(", ")}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative w-full sm:w-[225px]">
                  <input
                    id="salaryValueBruttoFrom"
                    className={`${
                      light ? "bg-white text-black" : "bg-gray-700 text-white"
                    } duration-300 w-full border border-primaryStart/70 p-2 rounded-md`}
                    placeholder={`Brutto od`}
                    type="text"
                    value={formData?.salaryValueBruttoFrom}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only numbers
                      if (/^\d*$/.test(value)) {
                        setFormData({
                          ...formData,
                          salaryValueBruttoFrom: Number(e.target.value),
                        });
                      }
                    }}
                  />
                  <div className="rounded-r-md flex items-center justify-center absolute right-0 top-0 h-full bg-gradient-to-b from-accentStart to-accentEnd text-white  px-3 ">
                    zł{formData.salary === "Stawka godzinowa" && "/h"}
                  </div>
                </div>
                <div className="hidden sm:block">-</div>
                <div className="relative w-full sm:w-[225px]">
                  <input
                    id="salaryValueBruttoTo"
                    className={`${
                      light ? "bg-white text-black" : "bg-gray-700 text-white"
                    } duration-300 w-full border ${
                      formData?.salaryValueBruttoFrom >
                      formData?.salaryValueBruttoTo
                        ? "border-red-500"
                        : "border-primaryStart/70"
                    } p-2 rounded-md`}
                    placeholder={`Brutto do`}
                    type="text"
                    value={formData?.salaryValueBruttoTo}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only numbers
                      if (/^\d*$/.test(value)) {
                        setFormData({
                          ...formData,
                          salaryValueBruttoTo: Number(e.target.value),
                        });
                      }
                    }}
                  />
                  <div className="rounded-r-md flex items-center justify-center absolute right-0 top-0 h-full bg-gradient-to-b from-accentStart to-accentEnd text-white  px-3 ">
                    zł{formData.salary === "Stawka godzinowa" && "/h"}
                  </div>
                </div>
              </div>
            </div>
          )}
          {formData?.preferences?.filter((p: string) =>
            [
              "Umowa zlecenie",
              "Umowa o dzieło",
              "Kontrakt B2B",
              "Praca dodatkowa",
              "Jednorazowe zlecenie",
              "Freelance",
            ].includes(p)
          ).length > 0 && (
            <div className="my-3">
              <h3 className="font-extrabold drop-shadow-lg">Kwota netto</h3>
              {formData?.salaryValueNettoTo <
                formData?.salaryValueNettoFrom && (
                <div className="text-red-500 text-sm">Uzupełnij dane</div>
              )}
              <div className="flex flex-row flex-wrap text-gray-600 text-sm">
                {formData?.preferences
                  ?.filter((p: string) =>
                    [
                      "Umowa zlecenie",
                      "Umowa o dzieło",
                      "Kontrakt B2B",
                      "Praca dodatkowa",
                      "Jednorazowe zlecenie",
                      "Freelance",
                    ].includes(p)
                  )
                  .join(", ")}
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative w-full sm:w-[225px]">
                  <input
                    id="salaryValueNettoFrom"
                    className={`${
                      light ? "bg-white text-black" : "bg-gray-700 text-white"
                    } duration-300 w-full border border-primaryStart/70 p-2 rounded-md`}
                    placeholder={`Netto od`}
                    type="text"
                    value={formData?.salaryValueNettoFrom}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only numbers
                      if (/^\d*$/.test(value)) {
                        setFormData({
                          ...formData,
                          salaryValueNettoFrom: Number(e.target.value),
                        });
                      }
                    }}
                  />
                  <div className="rounded-r-md flex items-center justify-center absolute right-0 top-0 h-full bg-gradient-to-b from-accentStart to-accentEnd text-white  px-3 ">
                    zł{formData.salary === "Stawka godzinowa" && "/h"}
                  </div>
                </div>
                <div className="hidden sm:block">-</div>
                <div className="relative w-full sm:w-[225px]">
                  <input
                    id="salaryValueNettoTo"
                    className={`${
                      light ? "bg-white text-black" : "bg-gray-700 text-white"
                    } duration-300 w-full border ${
                      formData?.salaryValueNettoTo <
                      formData?.salaryValueNettoFrom
                        ? "border-red-500"
                        : "border-primaryStart/70"
                    } p-2 rounded-md`}
                    placeholder={`Netto do`}
                    type="text"
                    value={formData?.salaryValueNettoTo}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only numbers
                      if (/^\d*$/.test(value)) {
                        setFormData({
                          ...formData,
                          salaryValueNettoTo: Number(e.target.value),
                        });
                      }
                    }}
                  />
                  <div className="rounded-r-md flex items-center justify-center absolute right-0 top-0 h-full bg-gradient-to-b from-accentStart to-accentEnd text-white  px-3 ">
                    zł{formData.salary === "Stawka godzinowa" && "/h"}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 mt-3">
            <div className="font-extrabold">Obowiązki</div>
            <p className="text-xs mt-px">(opcjonalnie)</p>
          </div>
          <EditorResponsibilities
            formData={formData}
            setFormData={setFormData}
          />
          <TechnologySelector
            technologies={technologies}
            setFormData={setFormData}
            light={light}
            formData={formData}
          />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 rounded-md bg-black text-white hover:scale-105 duration-100"
            >
              Wstecz
            </button>
            <button
              type="button"
              onClick={() => {
                if (formData.tags && formData.salary && formData.name) {
                  if (
                    formData?.places?.includes("Stacjonarny") ||
                    formData?.places?.includes("Hybrydowy")
                  ) {
                    if (!formData?.region || !formData?.city) {
                      return toast.error("Uzupełnij miasto lub region!", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      });
                    }
                  }
                  if (
                    formData?.preferences?.filter(
                      (p: string) =>
                        ![
                          "Umowa zlecenie",
                          "Umowa o dzieło",
                          "Kontrakt B2B",
                          "Praca dodatkowa",
                          "Jednorazowe zlecenie",
                          "Freelance",
                        ].includes(p)
                    )?.length > 0
                  ) {
                    if (!formData?.salaryValueBruttoFrom) {
                      return toast.error("Wpisz wynagrodzenie", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      });
                    }
                    if (
                      !formData?.salaryValueBruttoFrom &&
                      formData?.salaryValueBruttoTo
                    ) {
                      return toast.error("Podaj wartość brutto od!", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      });
                    }
                  }
                  if (formData?.preferences?.includes("Kontrakt B2B")) {
                    if (!formData?.salaryValueNettoFrom) {
                      return toast.error("Wpisz wynagrodzenie", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      });
                    }
                    if (
                      !formData?.salaryValueNettoFrom &&
                      formData?.salaryValueNettoTo
                    ) {
                      return toast.error("Podaj wartość netto od!", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      });
                    }
                  }
                  if (formData?.salaryValueBruttoFrom) {
                    if (!formData?.salaryValueBruttoTo) {
                      return toast.error("Podaj wartość brutto do!", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      });
                    }
                    if (
                      formData?.salaryValueBruttoTo <
                      formData?.salaryValueBruttoFrom
                    ) {
                      return toast.error(
                        "Wartość brutto od nie może większa niż wartość brutto do!",
                        {
                          position: "bottom-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                        }
                      );
                    }
                  }
                  if (formData?.salaryValueNettoFrom) {
                    if (!formData?.salaryValueNettoTo) {
                      return toast.error("Podaj wartość netto do!", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      });
                    }
                    if (
                      formData?.salaryValueNettoTo <
                      formData?.salaryValueNettoFrom
                    ) {
                      return toast.error(
                        "Wartość netto od nie może większa niż wartość netto do!",
                        {
                          position: "bottom-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                        }
                      );
                    }
                  }
                  nextStep();
                } else {
                  return toast.error("Uzupełnij dane!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                  });
                }
              }}
              className="hover:scale-105 duration-100 p-2 bg-gradient-to-b from-ctaStart to-ctaEnd px-4 py-2 rounded-md text-white"
            >
              Następny krok
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
const technologies = [
  "Adobe Illustrator",
  "Adobe InDesign",
  "Adobe Lightroom",
  "Adobe Photoshop",
  "Adobe XD",
  "Affinity Designer",
  "Affinity Photo",
  "Anima App",
  "Atomic",
  "Avocode",
  "Axure",
  "Blender",
  "Clarity Design System",
  "Dimensions",
  "Dynamo",
  "Figma",
  "Frontify",
  "Gravit",
  "Haiku",
  "Inkscape",
  "InVision",
  "Lucidpress",
  "Marvel",
  "Moqups",
  "Overflow.io",
  "Pixelmator",
  "Proto.io",
  "ProtoPie",
  "Sizzy",
  "Sketch",
  "Sympli",
  "Zeplin",
  "JavaScript",
  "HTML",
  "CSS",
  "SQL",
  "Python",
  "Java",
  "C#",
  "PHP",
  "C++",
  "TypeScript",
  "Kotlin",
  "Objective-C",
  "Scala",
  "PL/SQL",
  "T-SQL",
  "SCSS",
  "Ruby",
  "Go",
  "PowerShell",
  "Bash",
  "F#",
  "C",
  "Rust",
  "Dart",
  "Elixir",
  "Clojure",
  "WebAssembly",
  "Assembly",
  "Swift",
  "R",
  "VB.NET",
  "COBOL",
  "Delphi",
  "Erlang",
  "Lua",
  "MATLAB",
  "Perl",
  "Groovy",
  "Haskell",
  "Gremlin",
  "UML",
  "BPMN",
  "SAP ABAP",
  "Node.js",
  "jQuery",
  ".NET",
  "React.js",
  "Next.js",
  "Angular",
  "AngularJS",
  "ASP.NET",
  ".NET Core",
  "Express",
  "Spring Framework",
  "Microsoft Excel",
  "Vue.js",
  "Django",
  "Ruby on Rails",
  "Git",
  "Entity Framework",
  "Hibernate",
  "NHibernate",
  "Drupal",
  "Maven",
  "Jenkins",
  "Kafka",
  "npm",
  "RabbitMQ",
  "Selenium",
  "Symfony",
  "JavaServer Pages",
  "Apache Tomcat",
  "WCF",
  "WPF",
  "Microsoft IIS",
  "ASP.NET MVC",
  "ASP.NET Core MVC",
  "ASP.NET Web Forms",
  "ASP.NET Web API",
  "JBoss Application Server",
  "OpenJDK",
  "Spring Boot",
  "Apache Flink",
  "Apache Storm",
  "Play Framework",
  "Apache Spark",
  "Hadoop",
  "Apache Hive",
  "Google Analytics",
  "Google Tag Manager",
  "Enterprise Architect",
  "Archimate",
  "Active Directory",
  "Apache Lucene",
  "Pandas",
  "Flask",
  "Unity 3D",
  "React Native",
  "Laravel",
  "TensorFlow",
  "Ansible",
  "Cordova",
  "Xamarin",
  "Apache Pig",
  "Apache Ambari",
  "Apache Airflow",
  "Unreal Engine",
  "Flutter",
  "Torch/PyTorch",
  "Puppet",
  "Chef",
  "CryEngine",
  "Android SDK",
  "Babel",
  "Bower",
  "TeamCity",
  "Octopus Deploy",
  "Azure DevOps",
  "Cloudflare",
  "ESLint",
  "SVN",
  "GitLab",
  "Gradle",
  "Gulp",
  "HAProxy",
  "Terraform",
  "Varnish",
  "Webpack",
  "Travis CI",
  "Yarn",
  "Consul",
  "Prometheus",
  "Gatling",
  "Logstash",
  "Kibana",
  "Grafana",
  "Keras",
  "Scikit-learn",
  "Informatica PowerCenter",
  "IBM InfoSphere",
  "Microsoft SSIS",
  "Oracle Data Integrator",
  "Apache ActiveMQ",
  "Zabbix",
  "IBM WebSphere",
  "Nagios",
  "SCOM",
  "Splunk",
  "Appium",
  "SoapUI",
  "HP UFT",
  "Akka",
  "QlikView",
  "Tableau",
  "Svelte",
  "ZeroMQ",
  "Apache JMeter",
  "Cucumber.js",
  "Concourse",
  "SAPUI5",
  "OpenUI5",
  "MySQL",
  "PostgreSQL",
  "Microsoft SQL Server",
  "MongoDB",
  "Redis",
  "Solr",
  "Oracle",
  "Elasticsearch",
  "Azure Cosmos DB",
  "Azure SQL",
  "MariaDB",
  "Amazon DocumentDB",
  "SQLite",
  "Firebase",
  "DynamoDB",
  "Cassandra",
  "Couchbase",
  "DB2",
  "Neo4j",
  "SAP HANA",
  "OrientDB",
  "Snowflake Data Cloud",
  "Linux",
  "Windows Server",
  "Docker",
  "Android",
  "AWS",
  "Microsoft Azure",
  "Google Cloud Platform",
  "macOS",
  "WordPress",
  "Kubernetes",
  "SharePoint",
  "CentOS",
  "Ubuntu",
  "Debian",
  "Red Hat",
  "OpenStack",
  "OpenShift",
  "iOS",
  "Arduino",
  "IBM Cloud",
  "Heroku",
  "SAP",
  "SAS",
  "Salesforce",
  "Microsoft Dynamics",
  "webMethods",
  "Oracle Service Bus",
  "Mule ESB",
  "Raspberry Pi",
  "VMware",
  "Veeam",
  "Jira",
  "Confluence",
  "Xray",
  "Microsoft Power BI",
  "Looker",
  "Cisco",
  "Visual Studio Code",
  "Visual Studio",
  "Notepad++",
  "IntelliJ IDEA",
  "Vim",
  "Sublime Text",
  "Android Studio",
  "PyCharm",
  "Eclipse",
  "Atom",
  "Jupyter Notebook",
  "Xcode",
  "PhpStorm",
  "NetBeans",
  "RStudio",
  "Emacs",
  "RubyMine",
  "TextMate",
  "Coda",
  "Komodo",
  "Zend Studio",
  "Light Table",
  "WebStorm",
  "IBM Rational Rose",
];

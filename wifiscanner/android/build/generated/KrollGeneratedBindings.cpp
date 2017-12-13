/* C++ code produced by gperf version 3.0.3 */
/* Command-line: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/gperf -L C++ -E -t /Users/attpls73/Desktop/wifiscanner/android/build/generated/KrollGeneratedBindings.gperf  */
/* Computed positions: -k'' */

#line 3 "/Users/attpls73/Desktop/wifiscanner/android/build/generated/KrollGeneratedBindings.gperf"


#include <string.h>
#include <v8.h>
#include <KrollBindings.h>

#include "com.whitepagecreation.wifiscanner.ExampleProxy.h"
#include "com.whitepagecreation.wifiscanner.WifiscannerModule.h"


namespace titanium {
namespace bindings {
#line 16 "/Users/attpls73/Desktop/wifiscanner/android/build/generated/KrollGeneratedBindings.gperf"
struct BindEntry;
/* maximum key range = 6, duplicates = 0 */

class WifiscannerBindings
{
private:
  static inline unsigned int hash (const char *str, unsigned int len);
public:
  static struct BindEntry *lookupGeneratedInit (const char *str, unsigned int len);
};

inline /*ARGSUSED*/
unsigned int
WifiscannerBindings::hash (register const char *str, register unsigned int len)
{
  return len;
}

struct BindEntry *
WifiscannerBindings::lookupGeneratedInit (register const char *str, register unsigned int len)
{
  enum
    {
      TOTAL_KEYWORDS = 2,
      MIN_WORD_LENGTH = 46,
      MAX_WORD_LENGTH = 51,
      MIN_HASH_VALUE = 46,
      MAX_HASH_VALUE = 51
    };

  static struct BindEntry wordlist[] =
    {
      {""}, {""}, {""}, {""}, {""}, {""}, {""}, {""}, {""},
      {""}, {""}, {""}, {""}, {""}, {""}, {""}, {""}, {""},
      {""}, {""}, {""}, {""}, {""}, {""}, {""}, {""}, {""},
      {""}, {""}, {""}, {""}, {""}, {""}, {""}, {""}, {""},
      {""}, {""}, {""}, {""}, {""}, {""}, {""}, {""}, {""},
      {""},
#line 19 "/Users/attpls73/Desktop/wifiscanner/android/build/generated/KrollGeneratedBindings.gperf"
      {"com.whitepagecreation.wifiscanner.ExampleProxy",::com::whitepagecreation::wifiscanner::wifiscanner::ExampleProxy::bindProxy,::com::whitepagecreation::wifiscanner::wifiscanner::ExampleProxy::dispose},
      {""}, {""}, {""}, {""},
#line 18 "/Users/attpls73/Desktop/wifiscanner/android/build/generated/KrollGeneratedBindings.gperf"
      {"com.whitepagecreation.wifiscanner.WifiscannerModule",::com::whitepagecreation::wifiscanner::WifiscannerModule::bindProxy,::com::whitepagecreation::wifiscanner::WifiscannerModule::dispose}
    };

  if (len <= MAX_WORD_LENGTH && len >= MIN_WORD_LENGTH)
    {
      unsigned int key = hash (str, len);

      if (key <= MAX_HASH_VALUE)
        {
          register const char *s = wordlist[key].name;

          if (*str == *s && !strcmp (str + 1, s + 1))
            return &wordlist[key];
        }
    }
  return 0;
}
#line 20 "/Users/attpls73/Desktop/wifiscanner/android/build/generated/KrollGeneratedBindings.gperf"

}
}
